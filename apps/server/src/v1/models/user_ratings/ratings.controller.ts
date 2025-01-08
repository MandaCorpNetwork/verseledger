import type { VLAuthPrincipal } from '@AuthProviders/VL.principal';
import { RatingDTO } from './mapping/UserRatingDTO';
import { IdUtil } from '@Utils/IdUtil';
import { Logger } from '@Utils/Logger';
import { ZodToOpenapi } from '@Utils/ZodToOpenapi';
import { TYPES } from '@Constant/types';
import { BadParameterError } from '@V1/errors/BadParameter';
import { BadRequestError } from '@V1/errors/BadRequest';
import { NotFoundError } from '@V1/errors/NotFoundError';
import type { RatingService } from '@V1/models/user_ratings/rating.service';
import type { NextFunction } from 'express';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpPost,
  next,
  requestBody,
} from 'inversify-express-utils';
import { ApiOperationPost, ApiPath } from 'swagger-express-ts';
import {
  CreateContractRatingsBodySchema,
  CreateUserRatingBodySchema,
  type ICreateContractRatingsBody,
  type ICreateUserRatingBody,
  type IUserRating,
} from 'vl-shared/src/schemas/UserRatingsSchema';
import type { ContractService } from '@V1/models/contract/contract.service';
import { UserRepository } from '@V1/models/user/user.repository';

@ApiPath({
  path: '/v1/ratings',
  name: 'Ratings',
  security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
})
@controller('/v1/ratings')
export class RatingsController extends BaseHttpController {
  constructor(
    @inject(TYPES.RatingService) private readonly ratingService: RatingService,
    @inject(TYPES.ContractService)
    private readonly contractService: ContractService,
  ) {
    super();
  }

  @ApiOperationPost({
    summary: 'Create Ratings for a Contract',
    description:
      'Create Ratings for the Users on a specific Contract after it is Completed or Canceled',
    responses: {
      200: {
        type: 'Success',
        description: 'Created Ratings',
        model: 'Rating',
      },
    },
    consumes: [],
    parameters: {
      body: {
        required: true,
        properties: ZodToOpenapi(CreateContractRatingsBodySchema),
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpPost('/contract', TYPES.VerifiedUserMiddleware)
  private async createContractRatings(
    @requestBody() body: ICreateContractRatingsBody,
    @next() nextFunc: NextFunction,
  ) {
    try {
      const model = CreateContractRatingsBodySchema.parse(body);
      const contractId = model.contract_id;
      if (!IdUtil.isValidId(contractId)) {
        Logger.error('Invalid Contract Id');
        return nextFunc(
          new BadParameterError(
            'contractId',
            `/v1/contracts/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/ratings/contract`,
          ),
        );
      }
      const submitter = this.httpContext.user as VLAuthPrincipal;
      const contract = await this.contractService.getContract(contractId, [
        'owner',
      ]);
      if (contract == null) {
        Logger.error(`Contract(${model.contract_id}) not found`);
        return nextFunc(
          new NotFoundError(`Contract(${model.contract_id}) not found`),
        );
      }
      if (contract.status !== 'COMPLETED' && contract.status !== 'CANCELED') {
        Logger.error(
          `Contract(${model.contract_id}) is not completed or canceled`,
        );
        return nextFunc(
          new BadRequestError(
            'Ratings can only be submitted on closed contracts',
            'invalid_status',
          ),
        );
      }
      if (!model.ratings) {
        this.ratingService.delayRatingContractors(submitter.id, contract);
        if (contract.owner_id === submitter.id) {
          this.ratingService.notifyContractorsToRate(contract);
        }
        return this.ok('Ratings submission delayed');
      }
      const [error, validatedRatings] = model.ratings.map(
        (
          rating,
        ): [
          BadParameterError | BadRequestError | undefined,
          ICreateUserRatingBody | undefined,
        ] => {
          if (!IdUtil.isValidId(rating.reciever_id)) {
            Logger.error(`Invalid Reciever ID: ${rating.reciever_id}`);
            return [
              new BadParameterError(
                `reciever_id`,
                `/contract(${contract.id})/rating(${IdUtil.expressRegex(IdUtil.IdPrefix.User)})`,
              ),
              undefined,
            ] as const;
          }
          if (submitter.details.id === rating.reciever_id) {
            Logger.error(`Cannot rate self`);
            return [
              new BadRequestError(
                'You can not rate yourself',
                'resource_ownership',
              ),
              undefined,
            ] as const;
          }
          if (contract.id !== rating.contract_id) {
            Logger.error(`Contract Id doesn't Match Provided`);
            return [
              new BadRequestError(
                'Contract ID does not match',
                'invalid_resource',
              ),
              undefined,
            ] as const;
          }
          Logger.info('Looking for recent ratings...');
          const ratingModel = CreateUserRatingBodySchema.strict().parse(rating);
          return [undefined, ratingModel] as const;
        },
      );
      if (error) return nextFunc(validatedRatings);
      const newRatings = await this.ratingService.createContractRating(
        contract,
        submitter.details,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validatedRatings as any,
      );
      for (const r of newRatings)
        UserRepository.updateUserRating(r.reciever_id);
      this.ratingService.notifyContractorsToRate(contract);
      return this.created(
        newRatings.map((r) => `/v1/ratings/${r.id}`).join(';'),
        newRatings.map((r) => new RatingDTO(r as IUserRating)),
      );
    } catch (e) {
      Logger.error(e);
    }
  }
}
