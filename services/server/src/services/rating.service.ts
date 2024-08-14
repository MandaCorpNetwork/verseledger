import { Logger } from '@/utils/Logger';
import { TYPES } from '@Constant/types';
import { inject, injectable } from 'inversify';
import { type NotificationService } from './notification.service';
import { UserRating } from '@Models/user_ratings.model';
import { Contract } from '@Models/contract.model';
import { BadRequestError } from '@Errors/BadRequest';
import { Op } from 'sequelize';
import { ICreateUserRatingBody } from 'vl-shared/src/schemas/UserRatingsSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

@injectable()
export class RatingService {
  constructor() {
    Logger.init();
  }

  @inject(TYPES.NotificationService)
  private notifications!: NotificationService;
  public async checkRecentRating(
    submitterId: string,
    ratingType: string,
    recieverId: string,
  ) {
    const recentRating = await UserRating.findOne({
      where: {
        submitter_id: submitterId,
        reciever_id: recieverId,
        rating_type: ratingType,
        createdAt: {
          [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });
    if (recentRating)
      throw new BadRequestError(
        'You can only submit one rating per user per week',
        'duplicate_entry',
      );
  }

  public async createContractRating(
    contract: Contract,
    submitter: IUser,
    ratings: ICreateUserRatingBody[],
  ) {
    const createdRatings: UserRating[] = [];
    for (const r of ratings) {
      const tempRatingType = contract.subtype;
      const newRating = await UserRating.create({
        ...r,
        rating_type: tempRatingType,
        submitter_id: submitter.id,
        contract_id: contract.id,
      });
      createdRatings.push(newRating);
      this.notifications.createNotification({
        user_id: r.reciever_id,
        text: `You have recieved a new rating ${submitter ? `from ${submitter.displayName}` : ''} for ${contract.title}`,
        resource: `topic/ratings/${r.reciever_id}`,
      });
    }
    return createdRatings;
  }

  public async notifyContractorsToRate(contract: Contract) {
    for (const bid of contract.Bids) {
      const bidderId = bid.user_id;
      const status =
        contract.status === 'COMPLETED'
          ? 'Completed'
          : contract.status === 'CANCELED'
            ? 'Canceled'
            : 'Error';
      this.notifications.createNotification({
        user_id: bidderId,
        text: `${contract.title} Contract has been ${status}. Please submit Ratings for Contract Users} `,
        resource: `topic/contracts/${contract.id}/status`,
      });
    }
  }

  public async delayRatingContractors(submitterId: string, contract: Contract) {
    this.notifications.createNotification({
      user_id: submitterId,
      text: `Pending Contract rating(s) on ${contract.title}.`,
      resource: `topic/contracts/${contract.id}/status`,
    });
  }
}
