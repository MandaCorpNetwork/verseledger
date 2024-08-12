import { VLAuthPrincipal } from '@/authProviders/VL.principal';
import { RatingDTO } from '@/DTO/UserRatingDTO';
import { IdUtil } from '@/utils/IdUtil';
import { Logger } from '@/utils/Logger';
import { ZodToOpenapi } from '@/utils/ZodToOpenapi';
import { TYPES } from '@Constant/types';
import { BadParameterError } from '@Errors/BadParameter';
import { BadRequestError } from '@Errors/BadRequest';
import { NotFoundError } from '@Errors/NotFoundError';
import { Contract } from '@Models/contract.model';
import { RatingService } from '@Services/rating.service';
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
import { CreateContractBodySchema } from 'vl-shared/src/schemas/ContractSchema';
import {
  CreateContractRatingsBodySchema,
  CreateUserRatingBodySchema,
  ICreateContractRatingsBody,
  IUserRating,
} from 'vl-shared/src/schemas/UserRatingsSchema';

@ApiPath({
  path: '/v1/ratings',
  name: 'Ratings',
  security: { VLAuthAccessToken: [] },
})
@controller('/v1/ratings')
export class RatingsController extends BaseHttpController {
  constructor(
    @inject(TYPES.RatingService) private ratingService: RatingService,
  ) {
    super();
  }

  @ApiOperationPost({
    tags: ['Contract Ratings'],
    description: 'Create Ratings for a Contract',
    summary: 'Create Ratings for the Users on a specific Contract after it is Completed or Canceled',
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
    security: { VLAuthAccessToken: [] },
  })
  @httpPost('/contract', TYPES.VerifiedUserMiddleware)
  private async createContractRatings(
    @requestBody() body: ICreateContractRatingsBody,
    @next() nextFunc: NextFunction,
  ) {
    if (!IdUtil.isValidId(body.contract_id)) {
      throw nextFunc(
        new BadParameterError(
          'contractId',
          `/contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/ratings`,
        ),
      );
    }
    const dto = body;
    const submitter = this.httpContext.user as VLAuthPrincipal;
    const contract = await Contract.scope(['owner', 'bids']).findByPk(
      dto.contract_id,
    );
    if (contract == null)
      throw nextFunc(
        new NotFoundError(`Contract(${dto.contract_id}) not found`),
      );
    if (contract.status !== 'COMPLETED' && contract.status !== 'CANCELED')
      throw new BadRequestError(
        'Ratings can only be submitted on closed contracts',
        'invalid_status',
      );
    const validatedRatings = dto.ratings.map((rating) => {
      if (!IdUtil.isValidId(rating.reciever_id))
        throw nextFunc(
          new BadParameterError(
            `reciever_id`,
            `/contract(${contract.id})/rating(${IdUtil.expressRegex(IdUtil.IdPrefix.User)})`,
          ),
        );
      if (submitter.details.id === rating.reciever_id) {
        throw nextFunc(
          new BadRequestError(
            'You can not rate yourself',
            'resource_ownership',
          ),
        );
      }
      if (contract.id !== rating.contract_id) {
        throw nextFunc(
          new BadRequestError('Contract ID does not match', 'invalid_resource'),
        );
      }
      this.ratingService.checkRecentRating(
        submitter.details.id,
        contract.subtype,
        rating.reciever_id,
      );
      const model = CreateUserRatingBodySchema.strict().parse(rating);
      return model;
    });
    Logger.info(validatedRatings);
    const newRatings = await this.ratingService.createContractRating(
      contract,
      submitter.details,
      validatedRatings,
    );
    this.ratingService.notifyContractorsToRate(contract);
    return this.created(
      `/ratings/${newRatings.map((r) => r.id).join('&')}`,
      newRatings.map((r) => new RatingDTO(r as IUserRating)),
    );
  }
  @ApiOperationPost({
    tags: ['Delay Contract Rating'],
    description: 'Delaying Rating Contractors',
    summary:
      'Sends out notifications to Contractors to submit ratings and sends a reminder to the owner to submit ratings',
    responses: {
      200: {
        type: 'Success',
        description: 'Notified Users',
        model: 'Rating',
      },
    },
    consumes: [],
    parameters: {
      body: {
        required: true,
        properties: ZodToOpenapi(CreateContractBodySchema),
      },
    },
    security: { VLAuthAccessToken: [] },
  })
  @httpPost('/contract/:contractId/delayRating', TYPES.VerifiedUserMiddleware)
  private async delayRating(
    @requestParam('contractId') contractId: string,
    @next() nextFunc: NextFunction,
  ) {
    if (!IdUtil.isValidId(contractId)) {
      throw nextFunc(
        new BadParameterError(
          'contractId',
          `/contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/ratings`,
        ),
      );
    }
    const contract = await Contract.scope(['owner', 'bids']).findByPk(
      contractId,
    );
    if (contract == null)
      throw nextFunc(new NotFoundError(`Contract(${contractId}) not found`));
    if (contract.status !== 'COMPLETED' && contract.status !== 'CANCELED')
      throw nextFunc(
        new BadRequestError(
          'Ratings can only be submitted on closed contracts',
          'invalid_status',
        ),
      );
    this.ratingService.delayRatingContractors(contract);
    if (contract.owner_id === this.httpContext.user.details.id) {
      this.ratingService.notifyContractorsToRate(contract);
    }
  }
}
