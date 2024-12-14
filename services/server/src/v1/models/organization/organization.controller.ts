import { TYPES } from '@Constant/types';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  next,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { ApiOperationGet, ApiOperationPost, ApiPath } from 'swagger-express-ts';
import type { OrganizationService } from './organization.services';
import { inject } from 'inversify';
import type { VLAuthPrincipal } from '@AuthProviders/VL.principal';
import type { NextFunction } from 'express';
import {
  createOrganizationCMD,
  type ICreateOrganizationCMD,
} from 'vl-shared/src/schemas//orgs/OrganizationSchema';
import { BadRequestError } from '@V1/errors/BadRequest';
import { OrganizationToOrganizationDTO } from './mapping/OrganizationToOrganizationDTO.mapper';
import { ZodToOpenapi } from '@Utils/ZodToOpenapi';
import {
  type IOrgSearchCMD,
  OrgSearchCMD,
} from 'vl-shared/src/schemas/orgs/OrgSearchCMD';
import { IdUtil } from '@Utils/IdUtil';
import { NotFoundError } from '@V1/errors/NotFoundError';
import { PaginatedDataDTO } from '@V1/DTO';
import { OrganizationDTO } from './mapping/OrganizationDTO';

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
    description: 'Find organizations',
    summary: 'Find organizations',
    path: '/search',
    responses: {
      200: {
        type: 'Success',
        description: 'Orgs Found',
        model: 'Organization[]',
      },
    },
    consumes: [],
    parameters: {
      body: {
        required: true,
        properties: ZodToOpenapi(OrgSearchCMD),
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpPost('/search', TYPES.VerifiedUserMiddleware)
  private async search(
    @requestBody() body: IOrgSearchCMD,
    @next() nextFunc: NextFunction,
  ) {
    const search = OrgSearchCMD.strict().parse(body);
    const [error, orgs] = await this.orgService.search(search);
    if (error != null) {
      return nextFunc(error);
    }
    return this.ok(
      new PaginatedDataDTO(
        orgs.rows,
        {
          total: orgs.count,
          limit: Math.min(25, search.limit ?? 10),
          page: search?.page ?? 0,
        },
        OrganizationDTO,
      ),
    );
  }

  @ApiOperationGet({
    description: 'Get an Organization',
    summary: 'Get an Organization',
    path: '/{organizationId}',
    responses: {
      200: {
        type: 'Success',
        description: 'Org Found',
        model: 'Organization',
      },
    },
    consumes: [],
    parameters: {
      path: {
        organizationId: {
          required: true,
          description: 'An organization ID',
          type: 'string',
        },
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpGet(
    `/:organizationId(${IdUtil.expressRegex(IdUtil.IdPrefix.Organization)})`,
    TYPES.VerifiedUserMiddleware,
  )
  private async get(
    @next() nextFunc: NextFunction,
    @requestParam('organizationId') organizationId: string,
  ) {
    const org = await this.orgService.get(organizationId);
    if (org == null) return nextFunc(new NotFoundError(organizationId));
    return OrganizationToOrganizationDTO.map(org);
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

    const currentOrgs = await this.orgService.countMembership(user_id);
    if (currentOrgs >= MAX_ORGS) {
      return nextFunc(
        new BadRequestError(`You can only be a member of ${MAX_ORGS} orgs!`),
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
