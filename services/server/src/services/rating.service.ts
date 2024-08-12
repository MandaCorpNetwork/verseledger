import { Logger } from '@/utils/Logger';
import { TYPES } from '@Constant/types';
import { inject, injectable } from 'inversify';
import { type NotificationService } from './notification.service';
import { UserRating } from '@Models/user_ratings.model';
import { Contract } from '@Models/contract.model';
import { NotFoundError } from '@Errors/NotFoundError';
import { BadRequestError } from '@Errors/BadRequest';
import { Op } from 'sequelize';
import { NetworkError } from '@Errors/NetworkError';
import { User } from '@Models/user.model';

@injectable()
export class RatingService {
  constructor() {
    Logger.init();
  }

  @inject(TYPES.NotificationService)
  private notifications!: NotificationService;
  public async createContractRating(rating: {
    submitter_id: string;
    reciever_id: string;
    contract_id: string;
    rating_value: number;
    comments?: string;
  }) {
    const contract = await Contract.scope(['owner', 'bids']).findByPk(
      rating.contract_id,
    );
    if (contract == null) throw new NotFoundError('Contract not found');
    if (contract.status !== 'COMPLETED' && contract.status !== 'CANCELED')
      throw new BadRequestError(
        'Ratings can only be submitted on closed contracts',
        'invalid_status',
      );
    if (rating.submitter_id === rating.reciever_id)
      throw new BadRequestError(
        'You can not rate yourself',
        'resource_ownership',
      );
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
        throw new BadRequestError(
          'You can only submit one rating per user per week',
          'duplicate_entry',
        );
      const tempRatingType = contract.subtype;
      const newRating = await UserRating.create({
        ...rating,
        rating_type: tempRatingType,
      });
      const submitter = await User.findByPk(rating.submitter_id, {
        attributes: ['displayName'],
      });
      this.notifyContractorsToRate(contract);
      this.notifications.publish('/topic/newRating', {
        userId: rating.reciever_id,
        message: `You have recieved a new rating ${submitter ? `from ${submitter.displayName}` : ''} for ${contract.title}`,
      });
      return newRating;
    } catch (error) {
      Logger.error(`Error Occered While Creating Rating: ${error}`);
      throw new NetworkError(500, `Failed to verify Rating History: ${error}`);
    }
  }

  private async notifyContractorsToRate(contract: Contract) {
    const owner = await User.findByPk(contract.owner_id, {
      attributes: ['displayName'],
    });
    for (const bid of contract.Bids) {
      const bidderId = bid.user_id;
      const status =
        contract.status === 'COMPLETED'
          ? 'Completed'
          : contract.status === 'CANCELED'
            ? 'Canceled'
            : 'Error';
      this.notifications.publish('/topic/newRatingRequest', {
        userId: bidderId,
        message: `${contract.title} Contract has been ${status}. Please rate ${owner ? `${owner.displayName}` : 'the Contract Owner'} `,
      });
    }
  }

  private async delayRatingContractors(contractId: string) {
    try {
      const contract = await Contract.scope(['owner', 'bids']).findByPk(contractId);
      if (!contract) throw new NotFoundError('Contract not found');

      this.notifications.publish('topic/ratingReminder', {
        userId: contract.owner_id,
        message: `Pending contractor rating(s) on ${contract.title}.`,
      })
      this.notifyContractorsToRate(contract);
    } catch (error) {
      Logger.error(`Error Occured for Contract Ratings Notifications: ${error}`);
      throw new NetworkError(500, `Failed to notify Contract Memebers to Rate: ${error}`);
    }
  }
}
