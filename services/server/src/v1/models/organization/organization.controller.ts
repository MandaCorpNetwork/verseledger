import { TYPES } from '@Constant/types';
import {
  BaseHttpController,
  controller,
  httpPost,
  next,
  requestBody,
} from 'inversify-express-utils';
import { ApiOperationPost, ApiPath } from 'swagger-express-ts';
import { OrganizationService } from './organization.services';
import { inject } from 'inversify';
import { VLAuthPrincipal } from '@AuthProviders/VL.principal';
import { NextFunction } from 'express';
import {
  createOrganizationCMD,
  ICreateOrganizationCMD,
} from 'vl-shared/src/schemas//orgs/OrganizationSchema';
import { BadRequestError } from '@V1/errors/BadRequest';
import { OrganizationToOrganizationDTO } from './mapping/OrganizationToOrganizationDTO.mapper';
import { ZodToOpenapi } from '@Utils/ZodToOpenapi';

const MAX_ORGS = 3;

@ApiPath({
  path: '/v1/organizations',
  name: 'Organizations',
  description: 'Methods related to Orgs',
  security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
})
@controller('/v1/organizations', TYPES.VerifiedUserMiddleware)
export class OrganizationController extends BaseHttpController {
  constructor(
    @inject(TYPES.OrganizationService)
    private readonly orgService: OrganizationService,
  ) {
    super();
  }
  @ApiOperationPost({
    description: 'Create a new Organization',
    summary: 'Create Organization',
    responses: {
      200: {
        type: 'Success',
        description: 'Org Created',
        model: 'Organization',
      },
    },
    consumes: [],
    parameters: {
      body: {
        required: true,
        properties: ZodToOpenapi(createOrganizationCMD),
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpPost('/', TYPES.VerifiedUserMiddleware)
  private async createOrg(
    @requestBody() body: ICreateOrganizationCMD,
    @next() nextFunc: NextFunction,
  ) {
    const user_id = (this.httpContext.user as VLAuthPrincipal).id;

    const tOrg = createOrganizationCMD.strict().parse(body);

    const currentLeadingOrgs = await this.orgService.countOwnership(user_id);
    if (currentLeadingOrgs >= MAX_ORGS) {
      return nextFunc(
        new BadRequestError(`You can only create ${MAX_ORGS} orgs!`),
      );
    }

    const [error, newOrg] = await this.orgService.createOrg(tOrg, user_id);
    if (error != null) {
      return nextFunc(error);
    }
    return this.created(
      `/v1/organizations/${newOrg.id}`,
      OrganizationToOrganizationDTO.map(newOrg),
    );
  }
}
