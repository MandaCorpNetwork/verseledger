import { Logger } from '@Utils/Logger';
import { TYPES } from '@Constant/types';
import { inject, injectable } from 'inversify';
import type { NotificationService } from '@V1/models/notifications/notification.service';
import { UserRating } from '@V1/models/user_ratings/user_ratings.model';
import type { Contract } from '@V1/models/contract/contract.model';
import { Op } from 'sequelize';
import type { ICreateUserRatingBody } from 'vl-shared/src/schemas/UserRatingsSchema';
import type { IUser } from 'vl-shared/src/schemas/UserSchema';

@injectable()
export class RatingService {
  constructor() {
    Logger.init();
  }

  @inject(TYPES.NotificationService)
  private readonly notifications!: NotificationService;
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
    if (recentRating) return recentRating;
  }

  public async createContractRating(
    contract: Contract,
    submitter: IUser,
    ratings: ICreateUserRatingBody[],
  ) {
    const createdRatings: UserRating[] = [];
    for (const r of ratings) {
      const tempRatingType = contract.subtype;
      const recentRating = await this.checkRecentRating(
        submitter.id,
        contract.subtype,
        r.reciever_id,
      );
      if (recentRating) continue;
      const newRating = await UserRating.create({
        ...r,
        rating_type: tempRatingType,
        submitter_id: submitter.id,
        contract_id: contract.id,
      });
      createdRatings.push(newRating);
      //TODO: Need to send the updated data in the DTO
      this.notifications.createNotification(
        newRating.getDataValue('reciever_id'),
        `@NOTIFICATION.MESSAGES.NEW_CONTRACT_RATING`,
        {
          type: 'link',
          link: `/apps/contracts/${contract.id}`,
          arguments: { contractTitle: contract.title },
        },
      );
    }
    return createdRatings;
  }

  public async notifyContractorsToRate(contract: Contract) {
    const recievingBidStatus = ['WITHDRAWN', 'DISMISSED', 'ACCEPTED'];
    for (const bid of contract?.Bids ?? []) {
      if (recievingBidStatus.includes(bid.status)) {
        const bidderId = bid.user_id;
        this.notifications.createNotification(
          bidderId,
          `@NOTIFICATION.MESSAGES.CONTRACT_COMPLETED`,
          {
            type: 'link',
            link: `/apps/contracts/${contract.id}`,
            arguments: {
              contractTitle: contract.title,
              contractStatus: contract.status,
            },
          },
        );
        //TODO: Need to send the updated data in the DTO
      }
    }
  }

  public async delayRatingContractors(submitterId: string, contract: Contract) {
    //TODO: Need to send the updated data in the DTO
    this.notifications.createNotification(
      submitterId,
      `@NOTIFICATION.MESSAGES.CONTRACT_RATING_PENDING`,
      {
        type: 'link',
        link: `/apps/contracts/${contract.id}`,
        arguments: { contractTitle: contract.title },
      },
    );
  }
}
