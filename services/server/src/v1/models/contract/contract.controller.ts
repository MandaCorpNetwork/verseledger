import {
  BaseHttpController,
  controller,
  httpGet,
  httpPatch,
  httpPost,
  next,
  queryParam,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import { ContractService } from '@V1/models/contract/contract.service';
import { NextFunction } from 'express';
import { BodyError } from '@V1/errors/BodyError';
import { VLAuthPrincipal } from '@/authProviders/VL.principal';
import { IdUtil } from '@/utils/IdUtil';
import { BadParameterError } from '@V1/errors/BadParameter';
import { NotFoundError } from '@V1/errors/NotFoundError';
import {
  CreateContractBodySchema,
  IContract,
  UpdateContractSchema,
} from 'vl-shared/src/schemas/ContractSchema';
import { ZodError } from 'zod';
import {
  ApiOperationGet,
  ApiOperationPatch,
  ApiOperationPost,
  ApiPath,
} from 'swagger-express-ts';
import { ZodToOpenapi } from '@/utils/ZodToOpenapi';
import { Logger } from '@/utils/Logger';
import { ContractSearchSchema } from 'vl-shared/src/schemas/SearchSchema';
import { GenericError } from '@V1/errors/GenericError';
import { PaginatedDataDTO } from '@V1/DTO/PaginatedDataDTO';
import { ContractDTO } from '@V1/models/contract/mapping/ContractDTO';
import { UnauthorizedError } from '@V1/errors/UnauthorizedError';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { ContractToContractDTOMapper } from './mapping/contract.mapper';

@ApiPath({
  path: '/v1/contracts',
  name: 'Contracts',
  description: 'Methods related to Contracts',
  security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
})
@controller('/v1/contracts')
export class ContractController extends BaseHttpController {
  constructor(
    @inject(TYPES.ContractService) private contractService: ContractService,
  ) {
    super();
  }

  @ApiOperationPost({
    tags: ['Contracts'],
    description: 'Create a new Contract',
    summary: 'Create Contract',
    responses: {
      200: {
        type: 'Success',
        description: 'Contract Created',
        model: 'Contract',
      },
    },
    consumes: [],
    parameters: {
      body: {
        required: true,
        properties: ZodToOpenapi(CreateContractBodySchema),
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpPost('/', TYPES.VerifiedUserMiddleware)
  private async createContract(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @requestBody() body: any,
    @next() nextFunc: NextFunction,
  ) {
    try {
      const dto = body;
      const model = CreateContractBodySchema.strict().parse(dto);
      try {
        const newContract = await this.contractService.createContract({
          ...model,
          owner_id: (this.httpContext.user as VLAuthPrincipal).id,
        });
        return this.created(
          `/contracts/${newContract.id}`,
          ContractToContractDTOMapper.map(newContract),
        );
      } catch (error) {
        throw nextFunc(error);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw nextFunc(new BodyError(error.issues));
    }
  }

  @ApiOperationGet({
    tags: ['Contracts'],
    description: 'Get a Contract',
    summary: 'Get a Contract',
    path: '/{contractId}',
    responses: {
      200: {
        type: 'Success',
        description: 'Found',
        model: 'Contract',
      },
    },
    consumes: [],
    parameters: {
      path: { contractId: { required: true, description: 'A Contract ID' } },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpGet(
    `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})`,
    TYPES.VerifiedUserMiddleware,
  )
  private async getContract(
    @requestParam('contractId') contractId: string,
    @next() nextFunc: NextFunction,
  ) {
    if (!IdUtil.isValidId(contractId)) {
      throw nextFunc(
        new BadParameterError(
          'contractId',
          `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})`,
        ),
      );
    }

    const contract = await this.contractService.getContract(contractId);
    if (contract == null) {
      throw nextFunc(new NotFoundError(contractId));
    }
    return this.ok(ContractToContractDTOMapper.map(contract));
  }

  @ApiOperationPatch({
    tags: ['Contracts'],
    description: 'Update a Contract',
    summary: 'Update a Contract',
    path: '/{contractId}',
    responses: {
      200: {
        type: 'Success',
        description: 'Updated',
        model: 'Contract',
      },
    },
    consumes: [],
    parameters: {
      path: {
        contractId: { required: true, description: 'A Contract ID' },
      },
      body: {
        properties: {},
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpPatch(
    `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})`,
    TYPES.VerifiedUserMiddleware,
  )
  private async updateContract(
    @requestParam('contractId') contractId: string,
    @requestBody() contractRaw: IContractBid,
    @next() nextFunc: NextFunction,
  ) {
    const newContract = UpdateContractSchema.strict().parse(contractRaw);

    if (!IdUtil.isValidId(contractId)) {
      throw nextFunc(
        new BadParameterError(
          'contractId',
          `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})`,
        ),
      );
    }

    const contract = await this.contractService.getContract(contractId, [
      'owner',
    ]);
    if (contract == null) {
      throw nextFunc(new NotFoundError(contractId));
    }

    const userId = (this.httpContext.user as VLAuthPrincipal).id;
    if (userId != contract.owner_id) throw nextFunc(new UnauthorizedError());

    for (const k in newContract) {
      const key = k as keyof typeof newContract;
      if (newContract[key] != contract[key]) {
        contract.set(key, newContract[key]);
      }
    }
    await contract.save();

    //TODO: Notifications

    if (contract)
      return this.ok(ContractToContractDTOMapper.map(contract).strip());
  }

  @ApiOperationGet({
    tags: ['Contracts'],
    description: 'Search Contracts',
    summary: 'Search Contracts',
    path: '/',
    responses: {
      200: {
        type: 'array',
        description: 'Found',
        model: 'Contract',
      },
    },
    consumes: [],
    parameters: {
      query: {
        'search[subtype]': {
          required: false,
          description: 'Comma-delimited list of SubTypes',
          type: 'string',
        },
        'search[limit]': {
          required: false,
          description: '',
          maximum: 25,
          minimum: 0,
          default: 25,
          type: 'number',
        },
        'search[status]': {
          required: false,
          description: '',
          type: 'string',
          format: '',
        },
        'search[ownerId]': {
          required: false,
          description: '',
          type: 'string',
        },
        'search[contractId]': {
          required: false,
          description: '',
          type: 'string',
        },
        'search[bidDate]': {
          required: false,
          description: 'Date filter for Bid Date',
          type: 'string',
        },
        'search[startDate]': {
          required: false,
          description: 'Date filter for Start Date',
          type: 'string',
        },
        'search[endDate]': {
          required: false,
          description: 'Date filter for End Date',
          type: 'string',
        },
        'search[duration]': {
          required: false,
          description: 'Duration in days',
          type: 'number',
        },
        'search[contractorRatingLimit]': {
          required: false,
          description: 'Contractor Rating Limit',
          type: 'number',
        },
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpGet('/', TYPES.VerifiedUserMiddleware)
  private async searchContracts(
    @next() nextFunc: NextFunction,
    @queryParam('search') searchRaw?: unknown,
  ) {
    let search: ReturnType<(typeof ContractSearchSchema)['parse']>;
    try {
      search = ContractSearchSchema.strict().optional().parse(searchRaw)!;
    } catch (error) {
      Logger.error(error);
      throw new GenericError(400, (error as ZodError).issues);
    }
    const contractInfo = await this.contractService.search(search!);
    const contracts = contractInfo.rows;

    const response = new PaginatedDataDTO(
      contracts as IContract[],
      {
        total: contractInfo.count,
        limit: Math.min(25, search?.limit ?? 10),
        page: search?.page ?? 0,
      },
      ContractDTO,
    );
    return this.ok(response);
  }

  @ApiOperationGet({
    tags: ['Contracts'],
    description: 'Get Contracts from Bids',
    summary: 'Get Contracts from Bids that match a user & status',
    path: '/bids',
    responses: {
      200: {
        type: 'array',
        description: 'Found',
        model: 'Contract',
      },
    },
    consumes: [],
    parameters: {
      query: {
        userId: {
          required: true,
          description: 'User ID to match on Bids',
          type: 'string',
        },
        status: {
          required: true,
          description: 'Status to match on Bids',
          type: 'string',
        },
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpGet('/bids')
  private async getContractsByUserAndStatus(
    @next() nextFunc: NextFunction,
    @queryParam('userId') userId: string,
    @queryParam('status') status: IContractBid['status'],
  ) {
    if (!IdUtil.isValidId(userId)) {
      throw nextFunc(new BadParameterError('userId', '/bids/contracts'));
    }
    try {
      const contracts = await this.contractService.getContractsByUserId(
        userId,
        status as IContractBid['status'],
      );
      return contracts;
    } catch (error) {
      throw new GenericError(400, (error as ZodError).issues);
    }
  }
}
