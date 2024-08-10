import { VLAuthPrincipal } from "@/authProviders/VL.principal";
import { Logger } from "@/utils/Logger";
import { ZodToOpenapi } from "@/utils/ZodToOpenapi";
import { TYPES } from "@Constant/types";
import { BodyError } from "@Errors/BodyError";
import { FeedbackService } from "@Services/feedback.service";
import { NextFunction } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, next, requestBody } from "inversify-express-utils";
import { ApiOperationPost, ApiPath } from "swagger-express-ts";
import { FeedbackFormSchema } from "vl-shared/src/schemas/FeedbackFormSchema";

@ApiPath({
  path: '/v1/feedback',
  name: 'Feedback',
  security: { VLAuthAccessToken: [] },
})
@controller('/v1/feedback')
export class FeedbackController extends BaseHttpController {
  constructor(
    @inject(TYPES.FeedbackService) private feedbackService: FeedbackService,
  ) {
    super();
  }
  // TODO: Add ZodUnion to ZodToOpenapi
  // @ApiOperationPost({
  //   tags: ['Feedback'],
  //   description: 'Submit new feedback',
  //   summary: 'Submitting Feedback Form',
  //   responses: {
  //     200: {
  //       type: 'Success',
  //       description: 'Feedback Submitted',
  //       model: 'Feedback',
  //     },
  //   },
  //   consumes: [],
  //   parameters: {
  //     body: {
  //       required: true,
  //       properties: ZodToOpenapi(FeedbackFormSchema),
  //     },
  //   },
  //   security: { VLAuthAccessToken: [] },
  // })
  @httpPost('/', TYPES.VerifiedUserMiddleware)
  private async submitFeedback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @requestBody() body: any,
    @next() nextFunc: NextFunction,
  ) {
    try {
      const feedback = FeedbackFormSchema.parse(body);
      Logger.info(`Recieved Feedback:`, feedback);

      const issue = await this.feedbackService.createFeedbackIssue(feedback);

      return this.ok({
        message: 'Feedback Submitted',
        issueUrl: issue.html_url,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw nextFunc(new BodyError(error.issues));
    }
  }
}