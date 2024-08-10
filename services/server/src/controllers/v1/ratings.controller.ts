import { VLAuthPrincipal } from "@/authProviders/VL.principal";
import { Logger } from "@/utils/Logger";
import { ZodToOpenapi } from "@/utils/ZodToOpenapi";
import { TYPES } from "@Constant/types";
import { BodyError } from "@Errors/BodyError";
import { GenericError } from "@Errors/GenericError";
import { RatingService } from "@Services/rating.service";
import { NextFunction } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, next, requestBody } from "inversify-express-utils";
import { ApiOperationPost, ApiPath } from "swagger-express-ts";
import { CreateContractBodySchema } from "vl-shared/src/schemas/ContractSchema";
import { CreateUserRatingBodySchema, ICreateUserRatingBody, IUserRating } from "vl-shared/src/schemas/UserRatingsSchema";
import { ZodError } from "zod";

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
    tags: ['Contract Rating'],
    description: 'Create a Contract Rating',
    summary: 'Create a Contract Rating',
    responses: {
      200: {
        type: 'Success',
        description: 'Created Rating',
        model: 'Rating',
      },
    },
    consumes: [],
    parameters: {
      body: {
        required: true,
        properties: ZodToOpenapi(CreateContractBodySchema),
      }
    },
    security: { VLAuthAccessToken: [] },
  })
  @httpPost('/contract', TYPES.VerifiedUserMiddleware)
  private async createContractRating(
    @requestBody() body: ICreateUserRatingBody,
    @next() nextFunc: NextFunction,
  ) {
    try {
      const dto = body;
      const model = CreateUserRatingBodySchema.strict().parse(dto);
      Logger.info(model);
      try {
        const newRating = await this.ratingService.createContractRating({
          ...model,
          submitter_id: (this.httpContext.user as VLAuthPrincipal).id,
        });
        return this.created(
          `/ratings/${newRating.id}`,
          new RatingDTO(newRating as IUserRating),
        );
      } catch (error) {
        throw new GenericError(400, (error as ZodError).issues);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw nextFunc(new BodyError(error.issues));
    }
  }
}