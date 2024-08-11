import { Logger } from "@/utils/Logger";
// import { TYPES } from "@Constant/types";
import { injectable } from "inversify";
// import { type NotificationService } from "./notification.service";
import { UserRating } from "@Models/user_ratings.model";
import { Contract } from "@Models/contract.model";
import { NotFoundError } from "@Errors/NotFoundError";
import { BadRequestError } from "@Errors/BadRequest";
import { Op } from "sequelize";
import { NetworkError } from "@Errors/NetworkError";

@injectable()
export class RatingService {
  constructor() {
    Logger.init();
  }

  // @inject(TYPES.NotificiationService)
  // private notifications!: NotificationService;
  public async createContractRating(rating: { submitter_id: string; reciever_id: string; contract_id: string; rating_value: number; comments?: string; }) {
    const contract = await Contract.scope(['owner', 'bids']).findByPk(rating.contract_id);
    if (contract == null) throw new NotFoundError('Contract not found');
    if (contract.status !== 'COMPLETED' && contract.status !== 'CANCELED')
      throw new BadRequestError('Ratings can only be submitted on closed contracts', 'invalid_status');
    if (rating.submitter_id === rating.reciever_id)
      throw new BadRequestError('You can not rate yourself', 'resource_ownership');
    try {
      Logger.info(`Attempting to find recent Rating`);
      const recentRating = await UserRating.findOne({
        where: {
          submitter_id: rating.submitter_id,
          reciever_id: rating.reciever_id,
          createdAt: {
            [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      });
      if (recentRating)
        throw new BadRequestError('You can only submit one rating per user per week', 'duplicate_entry');
      const tempRatingType = contract.subtype;
    const newRating = await UserRating.create({
      ...rating,
      rating_type: tempRatingType,
    });
      return newRating;
    } catch (error) {
      Logger.error(`Error Occered While Creating Rating: ${error}`);
      throw new NetworkError(500, `Failed to verify Rating History: ${error}`);
    }
  }
}
