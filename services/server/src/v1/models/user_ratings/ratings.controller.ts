import { VLAuthPrincipal } from '@/authProviders/VL.principal';
import { RatingDTO } from './mapping/UserRatingDTO';
import { IdUtil } from '@/utils/IdUtil';
import { Logger } from '@/utils/Logger';
import { ZodToOpenapi } from '@/utils/ZodToOpenapi';
import { TYPES } from '@Constant/types';
import { BadParameterError } from '@V1/errors/BadParameter';
import { BadRequestError } from '@V1/errors/BadRequest';
import { NotFoundError } from '@V1/errors/NotFoundError';
import { Contract } from '@V1/models/contract/contract.model';
import { RatingService } from '@V1/models/user_ratings/rating.service';
import { NextFunction } from 'express';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpPost,
  next,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { ApiOperationPost, ApiPath } from 'swagger-express-ts';
import {
  CreateContractRatingsBodySchema,
  CreateUserRatingBodySchema,
  ICreateContractRatingsBody,
  IUserRating,
} from 'vl-shared/src/schemas/UserRatingsSchema';
import { ContractService } from '../contract/contract.service';

@ApiPath({
  path: '/v1/ratings',
  name: 'Ratings',
  security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
})
@controller('/v1/ratings')
export class RatingsController extends BaseHttpController {
  constructor(
    @inject(TYPES.RatingService) private ratingService: RatingService,
    @inject(TYPES.ContractService) private contractService: ContractService,
  ) {
    super();
  }

  @ApiOperationPost({
    tags: ['Contract Ratings'],
    description: 'Create Ratings for a Contract',
    summary:
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
    @requestParam('contractId') contractId: string,
    @requestBody() body: ICreateContractRatingsBody,
    @next() nextFunc: NextFunction,
  ) {
    try {
      if (!IdUtil.isValidId(contractId)) {
        Logger.error('Invalid Contract Id');
        throw nextFunc(
          new BadParameterError(
            'contractId',
            `/v1/contracts/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/ratings/contract`,
          ),
        );
      }
      const model = CreateContractRatingsBodySchema.parse(body);
      const submitter = this.httpContext.user as VLAuthPrincipal;
      const contract = await this.contractService.getContract(contractId, ['owner']);
      if (contract == null) {
        Logger.error(`Contract(${model.contract_id}) not found`);
        throw nextFunc(
          new NotFoundError(`Contract(${model.contract_id}) not found`),
        );
      }
      if (contract.status !== 'COMPLETED' && contract.status !== 'CANCELED') {
        Logger.error(
          `Contract(${model.contract_id}) is not completed or canceled`,
        );
        throw nextFunc(
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
      const validatedRatings = model.ratings.map((rating) => {
        if (!IdUtil.isValidId(rating.reciever_id)) {
          Logger.error(`Invalid Reciever ID: ${rating.reciever_id}`);
          throw nextFunc(
            new BadParameterError(
              `reciever_id`,
              `/contract(${contract.id})/rating(${IdUtil.expressRegex(IdUtil.IdPrefix.User)})`,
            ),
          );
        }
        if (submitter.details.id === rating.reciever_id) {
          Logger.error(`Cannot rate self`);
          throw nextFunc(
            new BadRequestError(
              'You can not rate yourself',
              'resource_ownership',
            ),
          );
        }
        if (contract.id !== rating.contract_id) {
          Logger.error(`Contract Id doesn't Match Provided`);
          throw nextFunc(
            new BadRequestError(
              'Contract ID does not match',
              'invalid_resource',
            ),
          );
        }
        Logger.info('Looking for recent ratings...');
        const ratingModel = CreateUserRatingBodySchema.strict().parse(rating);
        return ratingModel;
      });
      const newRatings = await this.ratingService.createContractRating(
        contract,
        submitter.details,
        validatedRatings,
      );
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
