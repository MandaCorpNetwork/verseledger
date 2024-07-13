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
import { ContractService } from '@Services/contracts.service';
import { NextFunction } from 'express';
import { BodyError } from '@/errors/BodyError';
import { VLAuthPrincipal } from '@/authProviders/VL.principal';
import { IdUtil } from '@/utils/IdUtil';
import { BadParameterError } from '@Errors/BadParameter';
import { NotFoundError } from '@Errors/NotFoundError';
import {
  CreateContractBodySchema,
  IContract,
} from 'vl-shared/src/schemas/ContractSchema';
import { z, ZodError } from 'zod';
import {
  ApiOperationGet,
  ApiOperationPatch,
  ApiOperationPost,
  ApiPath,
} from 'swagger-express-ts';
import { ZodToOpenapi } from '@/utils/ZodToOpenapi';
import { Logger } from '@/utils/Logger';
import { ContractSearchSchema } from 'vl-shared/src/schemas/SearchSchema';
import { GenericError } from '@Errors/GenericError';
import { PaginatedDataDTO } from '@/DTO/PaginatedDataDTO';
import { ContractDTO } from '@/DTO';
import { ContractBidDTO } from '@/DTO/ContractBidDTO';
import { UnauthorizedError } from '@Errors/UnauthorizedError';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { ContractBidStatusSchema } from 'vl-shared/src/schemas/ContractBidStatusSchema';
import { NotModified } from '@Errors/NotModified';

@ApiPath({
  path: '/v1/contracts',
  name: 'Contracts',
  security: { VLAuthAccessToken: [] },
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
    security: { VLAuthAccessToken: [] },
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
      Logger.info(model);
      try {
        const newContract = await this.contractService.createContract({
          ...model,
          owner_id: (this.httpContext.user as VLAuthPrincipal).id,
        });
        return this.created(
          `/contracts/${newContract.id}`,
          new ContractDTO(newContract as IContract),
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
    security: { VLAuthAccessToken: [] },
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
    return this.ok(new ContractDTO(contract as IContract));
  }

  @ApiOperationGet({
    tags: ['Bids'],
    description: "Get a Contract's Bids",
    summary: 'Get Bids',
    path: '/{contractId}/bids',
    responses: {
      200: {
        type: 'Success',
        description: 'Found',
        model: 'Unknown',
      },
    },
    consumes: [],
    parameters: {
      path: { contractId: { required: true, description: 'A Contract ID' } },
    },
    security: { VLAuthAccessToken: [] },
  })
  @httpGet(
    `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids`,
    TYPES.VerifiedUserMiddleware,
  )
  private async getContractBids(
    @requestParam('contractId') contractId: string,
    @next() nextFunc: NextFunction,
    @queryParam('search') searchRaw?: unknown,
  ) {
    if (!IdUtil.isValidId(contractId)) {
      throw nextFunc(
        new BadParameterError(
          'contractId',
          `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids`,
        ),
      );
    }
    Logger.info(searchRaw);

    const contract = await this.contractService.getContract(contractId);
    if (contract == null) {
      throw nextFunc(new NotFoundError(contractId));
    }
    return this.ok(
      new PaginatedDataDTO(
        contract.Bids,
        //TODO: Implement Pagination
        { total: 0, limit: 0, page: 0 },
        ContractBidDTO,
      ),
    );
  }

  @ApiOperationGet({
    tags: ['Bids'],
    description: 'Get a Bid',
    summary: 'Get a Bid',
    path: '/{contractId}/bids/{bidId}',
    responses: {
      200: {
        type: 'Success',
        description: 'Found',
        model: 'Unknown',
      },
    },
    consumes: [],
    parameters: {
      path: {
        contractId: { required: true, description: 'A Contract ID' },
        bidId: { required: true, description: 'A Bid ID' },
      },
    },
    security: { VLAuthAccessToken: [] },
  })
  @httpGet(
    `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids/:bidId(${IdUtil.expressRegex(IdUtil.IdPrefix.Bid)})`,
    TYPES.VerifiedUserMiddleware,
  )
  private async getSingleContractBid(
    @requestParam('contractId') contractId: string,
    @requestParam('bidId') bidId: string,
    @next() nextFunc: NextFunction,
  ) {
    if (!IdUtil.isValidId(contractId)) {
      throw nextFunc(
        new BadParameterError(
          'contractId',
          `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids/:bidId(${IdUtil.expressRegex(IdUtil.IdPrefix.Bid)})`,
        ),
      );
    }
    if (!IdUtil.isValidId(bidId)) {
      throw nextFunc(
        new BadParameterError(
          'bidId',
          `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids/:bidId(${IdUtil.expressRegex(IdUtil.IdPrefix.Bid)})`,
        ),
      );
    }

    const bid = await this.contractService.getBid(contractId, bidId);
    if (bid == null) {
      throw nextFunc(new NotFoundError(bidId));
    }
    return this.ok(new ContractBidDTO(bid));
  }

  @ApiOperationPatch({
    tags: ['Bids'],
    description: 'Get a Bid',
    summary: 'Get a Bid',
    path: '/{contractId}/bids/{bidId}',
    responses: {
      200: {
        type: 'Success',
        description: 'Found',
        model: 'Unknown',
      },
    },
    consumes: [],
    parameters: {
      path: {
        contractId: { required: true, description: 'A Contract ID' },
        bidId: { required: true, description: 'A Bid ID' },
      },
      body: {
        properties: {},
      },
    },
    security: { VLAuthAccessToken: [] },
  })
  @httpPatch(
    `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids/:bidId(${IdUtil.expressRegex(IdUtil.IdPrefix.Bid)})`,
    TYPES.VerifiedUserMiddleware,
  )
  private async updateContractBid(
    @requestParam('contractId') contractId: string,
    @requestParam('bidId') bidId: string,
    @requestBody() bidRaw: IContractBid,
    @next() nextFunc: NextFunction,
  ) {
    const updateBidSchema = z.object({ status: ContractBidStatusSchema });

    const newBid = updateBidSchema.strict().parse(bidRaw);

    if (!IdUtil.isValidId(contractId)) {
      throw nextFunc(
        new BadParameterError(
          'contractId',
          `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids/:bidId(${IdUtil.expressRegex(IdUtil.IdPrefix.Bid)})`,
        ),
      );
    }
    if (!IdUtil.isValidId(bidId)) {
      throw nextFunc(
        new BadParameterError(
          'bidId',
          `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids/:bidId(${IdUtil.expressRegex(IdUtil.IdPrefix.Bid)})`,
        ),
      );
    }

    const bid = await this.contractService.getBid(contractId, bidId, [
      'contract',
    ]);
    if (bid == null) {
      throw nextFunc(new NotFoundError(bidId));
    }

    const userId = (this.httpContext.user as VLAuthPrincipal).id;
    const contract = bid.Contract;
    if (contract == null) throw nextFunc(new NotFoundError(bidId));

    const newStatus = newBid.status != bid.status;

    if (!newStatus) {
      throw new NotModified(`/(${contractId}/bids/${bidId}`);
    }

    //TODO: Org Support
    const isContractOwner = userId == contract.owner_id;
    switch (newBid.status) {
      case 'ACCEPTED': {
        if (!isContractOwner) {
          if (bid.status != 'INVITED') throw new UnauthorizedError();
          break;
        }
        if (bid.status != 'PENDING') throw new UnauthorizedError();
        break;
      }
      case 'REJECTED': {
        if (!isContractOwner) throw new UnauthorizedError();
        if (bid.status != 'PENDING') throw new UnauthorizedError();
        break;
      }
      case 'DECLINED': {
        if (isContractOwner) throw new UnauthorizedError();
        if (bid.status != 'INVITED') throw new UnauthorizedError();
        break;
      }
      default:
      case 'INVITED':
      case 'PENDING': {
        throw new UnauthorizedError();
      }
    }
    Logger.info('Before Update');
    bid.set('status', newBid.status);
    await bid.save();

    Logger.info('After Update');

    //TODO: Notifications

    if (bid.Contract) return this.ok(new ContractBidDTO(bid.toJSON()).strip());
  }

  @ApiOperationPost({
    tags: ['Bids', 'Invites'],
    description:
      'Bid on a Contract. If the user is Invited, will automatically Accept.',
    summary: 'Bid on a Contract / Accept an Invite',
    path: '/{contractId}/bids',
    responses: {
      200: {
        type: 'Success',
        description: 'Found',
        model: 'Unknown',
      },
    },
    consumes: [],
    parameters: {
      path: {
        contractId: { required: true, description: 'A Contract ID' },
      },
    },
    security: { VLAuthAccessToken: [] },
  })
  @httpPost(
    `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids`,
    TYPES.VerifiedUserMiddleware,
  )
  private async createContractBid(
    @requestParam('contractId') contractId: string,
    @next() nextFunc: NextFunction,
  ) {
    if (!IdUtil.isValidId(contractId)) {
      throw nextFunc(
        new BadParameterError(
          'contractId',
          `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids`,
        ),
      );
    }

    const contract = await this.contractService.getContract(contractId);
    if (contract == null) {
      throw nextFunc(new NotFoundError(contractId));
    }
    const ownerId = (this.httpContext.user as VLAuthPrincipal).id;
    const bid = await this.contractService.createBid(contractId, ownerId);
    return this.created(
      `/contracts/${bid.contract_id}/bids/${bid.id}`,
      new ContractBidDTO(bid),
    );
  }

  @ApiOperationPost({
    tags: ['Bids', 'Invites'],
    description: 'Invite a user to a contract',
    summary: 'Invite a user to a contract',
    path: '/{contractId}/invite',
    responses: {
      200: {
        type: 'Success',
        description: 'Found',
        model: 'Unknown',
      },
    },
    consumes: [],
    parameters: {
      path: {
        contractId: { required: true, description: 'A Contract ID' },
      },
      body: {
        properties: {
          userId: { type: 'string', required: true },
        },
        required: true,
      },
    },
    security: { VLAuthAccessToken: [] },
  })
  @httpPost(
    `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/invite`,
    TYPES.VerifiedUserMiddleware,
  )
  private async inviteToContract(
    @requestParam('contractId') contractId: string,
    @requestBody() body: string,
    @next() nextFunc: NextFunction,
  ) {
    if (!IdUtil.isValidId(contractId)) {
      throw nextFunc(
        new BadParameterError(
          'contractId',
          `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/invite`,
        ),
      );
    }

    const dto = body;
    const model = z.object({ userId: z.string() }).strict().parse(dto);

    const { userId } = model;

    const contract = await this.contractService.getContract(contractId);
    if (contract == null) {
      throw nextFunc(new NotFoundError(contractId));
    }
    const ownerId = (this.httpContext.user as VLAuthPrincipal).id;

    const bid = await this.contractService.inviteToBid(
      contractId,
      ownerId,
      userId,
    );
    return this.created(
      `/contracts/${bid.contract_id}/bids/${bid.id}`,
      new ContractBidDTO(bid),
    );
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
      },
    },
    security: { VLAuthAccessToken: [] },
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
    security: { VLAuthAccessToken: [] },
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
