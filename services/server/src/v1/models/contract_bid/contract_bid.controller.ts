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
import {
  ApiOperationGet,
  ApiOperationPatch,
  ApiOperationPost,
  ApiPath,
} from 'swagger-express-ts';
import { NextFunction } from 'express';
import { BadParameterError } from '@V1/errors/BadParameter';
import { IdUtil } from '@Utils/IdUtil';
import { NotFoundError } from '@V1/errors/NotFoundError';
import { PaginatedDataDTO } from '@V1/DTO';
import { ContractBidDTO } from './mapping/ContractBidDTO';
import { UnauthorizedError } from '@V1/errors/UnauthorizedError';
import { NotModified } from '@V1/errors/NotModified';
import { VLAuthPrincipal } from '@AuthProviders/VL.principal';
import { ContractBidStatusSchema } from 'vl-shared/src/schemas/contracts/ContractBidStatusSchema';
import { z } from 'zod';
import { IContractBid } from 'vl-shared/src/schemas/contracts/ContractBidSchema';
import { ContractBidsService } from './contract_bid.service';

@ApiPath({
  path: '/v1/contracts/{contractId}/bids',
  name: 'Bids',
  description: 'Methods related to Bids',
  security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
})
@controller(
  `/v1/contracts/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids`,
)
export class BidsController extends BaseHttpController {
  constructor(
    @inject(TYPES.ContractService)
    private readonly contractService: ContractService,
    @inject(TYPES.ContractBidsService)
    private readonly bidsService: ContractBidsService,
  ) {
    super();
  }

  @ApiOperationGet({
    description: "Get a Contract's Bids",
    summary: 'Get Bids',
    path: '/',
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
        contractId: {
          required: true,
          description: 'A Contract ID',
          type: 'string',
        },
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpGet(`/`, TYPES.VerifiedUserMiddleware)
  private async getContractBids(
    @requestParam('contractId') contractId: string,
    @next() nextFunc: NextFunction,
    @queryParam('search') _searchRaw?: unknown,
  ) {
    if (!IdUtil.isValidId(contractId)) {
      return nextFunc(
        new BadParameterError(
          'contractId',
          `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids`,
        ),
      );
    }

    const contract = await this.contractService.getContract(contractId);
    if (contract?.Bids == null) {
      return nextFunc(new NotFoundError(contractId));
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
    description: 'Get a Bid',
    summary: 'Get a Bid',
    path: '/{bidId}',
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
        contractId: {
          required: true,
          description: 'A Contract ID',
          type: 'string',
        },
        bidId: { required: true, description: 'A Bid ID', type: 'string' },
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
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
      return nextFunc(
        new BadParameterError(
          'contractId',
          `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids/:bidId(${IdUtil.expressRegex(IdUtil.IdPrefix.Bid)})`,
        ),
      );
    }
    if (!IdUtil.isValidId(bidId)) {
      return nextFunc(
        new BadParameterError(
          'bidId',
          `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids/:bidId(${IdUtil.expressRegex(IdUtil.IdPrefix.Bid)})`,
        ),
      );
    }

    const bid = await this.bidsService.getBid(contractId, bidId);
    if (bid == null) {
      return nextFunc(new NotFoundError(bidId));
    }
    return this.ok(new ContractBidDTO(bid));
  }

  @ApiOperationPatch({
    description: 'Update a Bid',
    summary: 'Update a Bid',
    path: '/{bidId}',
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
        contractId: {
          required: true,
          description: 'A Contract ID',
          type: 'string',
        },
        bidId: { required: true, description: 'A Bid ID', type: 'string' },
      },
      body: {
        allowEmptyValue: true,
        required: false,
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpPatch(
    `/:bidId(${IdUtil.expressRegex(IdUtil.IdPrefix.Bid)})`,
    TYPES.VerifiedUserMiddleware,
  )
  private async updateContractBid(
    @requestParam('contractId') contractId: string,
    @requestParam('bidId') bidId: string,
    @requestBody() bidRaw: IContractBid,
    @next() nextFunc: NextFunction,
  ) {
    const updateBidSchema = z.object({
      status: ContractBidStatusSchema.optional(),
      amount: z.number().int().nonnegative().optional(),
    });

    const newBid = updateBidSchema.strict().parse(bidRaw);

    if (!IdUtil.isValidId(contractId)) {
      return nextFunc(
        new BadParameterError(
          'contractId',
          `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids/:bidId(${IdUtil.expressRegex(IdUtil.IdPrefix.Bid)})`,
        ),
      );
    }
    if (!IdUtil.isValidId(bidId)) {
      return nextFunc(
        new BadParameterError(
          'bidId',
          `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids/:bidId(${IdUtil.expressRegex(IdUtil.IdPrefix.Bid)})`,
        ),
      );
    }

    const bid = await this.bidsService.getBid(contractId, bidId, ['contract']);
    if (bid == null) {
      return nextFunc(new NotFoundError(bidId));
    }

    const userId = (this.httpContext.user as VLAuthPrincipal).id;
    const contract = bid.Contract;
    if (contract == null) return nextFunc(new NotFoundError(bidId));

    const newStatus = newBid.status != null && newBid.status != bid.status;
    const newAmount = newBid.amount != null && newBid.amount != bid.amount;
    if (!newStatus && !newAmount) {
      return nextFunc(new NotModified(`/(${contractId}/bids/${bidId}`));
    }

    //TODO: Org Support
    const isContractOwner = userId == contract.owner_id;

    if (newStatus) {
      switch (newBid.status) {
        case 'ACCEPTED': {
          if (isContractOwner && bid.status != 'PENDING')
            return nextFunc(new UnauthorizedError());
          if (bid.status != 'INVITED') return nextFunc(new UnauthorizedError());
          break;
        }
        case 'PENDING': {
          if (isContractOwner) return nextFunc(new UnauthorizedError());
          if (bid.status !== 'EXPIRED' && bid.status !== 'DECLINED')
            return nextFunc(new UnauthorizedError());
          break;
        }
        case 'DECLINED': {
          if (isContractOwner) return nextFunc(new UnauthorizedError());
          if (bid.status != 'INVITED') return nextFunc(new UnauthorizedError());
          break;
        }
        case 'WITHDRAWN': {
          if (isContractOwner) return nextFunc(new UnauthorizedError());
          if (bid.status !== 'ACCEPTED')
            return nextFunc(new UnauthorizedError());
          break;
        }
        case 'REJECTED': {
          if (!isContractOwner) return nextFunc(new UnauthorizedError());
          if (bid.status != 'PENDING') return nextFunc(new UnauthorizedError());
          break;
        }
        case 'INVITED': {
          if (!isContractOwner) return nextFunc(new UnauthorizedError());
          if (
            bid.status !== 'PENDING' &&
            bid.status !== 'EXPIRED' &&
            bid.status !== 'REJECTED'
          )
            return nextFunc(new UnauthorizedError());
          break;
        }
        case 'DISMISSED': {
          if (!isContractOwner) return nextFunc(new UnauthorizedError());
          if (bid.status !== 'ACCEPTED')
            return nextFunc(new UnauthorizedError());
          break;
        }
        case 'EXPIRED': {
          if (bid.status !== 'PENDING' && bid.status !== 'INVITED')
            return nextFunc(new UnauthorizedError());
          break;
        }
        default:
          return nextFunc(new BadParameterError('status', 'status'));
      }
    }
    if (newAmount) {
      if (!isContractOwner && !contract.isBargaining)
        return nextFunc(new UnauthorizedError());
      const status = newBid.status ?? bid.status;
      if (status === 'ACCEPTED') return nextFunc(new UnauthorizedError());
    }
    if (newStatus && newBid.status) bid.set('status', newBid.status);

    if (newAmount && newBid.amount != null) {
      bid.set('amount', newBid.amount);
      if (isContractOwner) {
        bid.set('status', 'INVITED');
      } else {
        bid.set('status', 'PENDING');
      }
    }
    await bid.save();

    if (bid.Contract) {
      this.bidsService.notifyBid(contract, bid);
      return this.ok(new ContractBidDTO(bid.toJSON()).strip());
    }
  }

  @ApiOperationPost({
    tags: ['Invites'],
    description:
      'Bid on a Contract. If the user is Invited, will automatically Accept.',
    summary: 'Bid on a Contract / Accept an Invite',
    path: '/',
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
        contractId: {
          required: true,
          description: 'A Contract ID',
          type: 'string',
        },
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpPost(`/`, TYPES.VerifiedUserMiddleware)
  private async createContractBid(
    @requestParam('contractId') contractId: string,
    @next() nextFunc: NextFunction,
  ) {
    if (!IdUtil.isValidId(contractId)) {
      return nextFunc(
        new BadParameterError(
          'contractId',
          `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids`,
        ),
      );
    }

    const contract = await this.contractService.getContract(contractId);
    if (contract == null) {
      return nextFunc(new NotFoundError(contractId));
    }
    const ownerId = (this.httpContext.user as VLAuthPrincipal).id;
    const bid = await this.bidsService.createBid(contractId, ownerId);
    return this.created(
      `/contracts/${bid.contract_id}/bids/${bid.id}`,
      new ContractBidDTO(bid),
    );
  }

  @ApiOperationPost({
    tags: ['Invites'],
    description: 'Invite a user to a contract',
    summary: 'Invite a user to a contract',
    path: '/invite',
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
        contractId: {
          required: true,
          description: 'A Contract ID',
          type: 'string',
        },
      },
      body: {
        properties: {
          userId: { type: 'string', required: true },
        },
        required: true,
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpPost(`/invite`, TYPES.VerifiedUserMiddleware)
  private async inviteToContract(
    @requestParam('contractId') contractId: string,
    @requestBody() body: string,
    @next() nextFunc: NextFunction,
  ) {
    if (!IdUtil.isValidId(contractId)) {
      return nextFunc(
        new BadParameterError(
          'contractId',
          `/v1/contracts/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids/invite`,
        ),
      );
    }

    const dto = body;
    const model = z.object({ userId: z.string() }).strict().parse(dto);

    const { userId } = model;

    const contract = await this.contractService.getContract(contractId);
    if (contract == null) {
      return nextFunc(new NotFoundError(contractId));
    }
    const ownerId = (this.httpContext.user as VLAuthPrincipal).id;

    const bid = await this.bidsService.inviteToBid(contractId, ownerId, userId);
    return this.created(
      `/contracts/${bid.contract_id}/bids/${bid.id}`,
      new ContractBidDTO(bid),
    );
  }
}
