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
import { IdUtil } from '@/utils/IdUtil';
import { NotFoundError } from '@V1/errors/NotFoundError';
import { PaginatedDataDTO } from '@V1/DTO';
import { ContractBidDTO } from './mapping/ContractBidDTO';
import { UnauthorizedError } from '@V1/errors/UnauthorizedError';
import { NotModified } from '@V1/errors/NotModified';
import { VLAuthPrincipal } from '@/authProviders/VL.principal';
import { ContractBidStatusSchema } from 'vl-shared/src/schemas/ContractBidStatusSchema';
import { z } from 'zod';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
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
    @inject(TYPES.ContractService) private contractService: ContractService,
    @inject(TYPES.ContractBidsService) private bidsService: ContractBidsService,
  ) {
    super();
  }

  @ApiOperationGet({
    tags: ['Bids'],
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
      path: { contractId: { required: true, description: 'A Contract ID' } },
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
      throw nextFunc(
        new BadParameterError(
          'contractId',
          `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids`,
        ),
      );
    }

    const contract = await this.contractService.getContract(contractId);
    if (contract == null || contract.Bids == null) {
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
        contractId: { required: true, description: 'A Contract ID' },
        bidId: { required: true, description: 'A Bid ID' },
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

    const bid = await this.bidsService.getBid(contractId, bidId);
    if (bid == null) {
      throw nextFunc(new NotFoundError(bidId));
    }
    return this.ok(new ContractBidDTO(bid));
  }

  @ApiOperationPatch({
    tags: ['Bids'],
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
        contractId: { required: true, description: 'A Contract ID' },
        bidId: { required: true, description: 'A Bid ID' },
      },
      body: {
        properties: {},
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

    const bid = await this.bidsService.getBid(contractId, bidId, ['contract']);
    if (bid == null) {
      throw nextFunc(new NotFoundError(bidId));
    }

    const userId = (this.httpContext.user as VLAuthPrincipal).id;
    const contract = bid.Contract;
    if (contract == null) throw nextFunc(new NotFoundError(bidId));

    const newStatus = newBid.status != null && newBid.status != bid.status;
    const newAmount = newBid.amount != null && newBid.amount != bid.amount;
    if (!newStatus && !newAmount) {
      throw new NotModified(`/(${contractId}/bids/${bidId}`);
    }

    //TODO: Org Support
    const isContractOwner = userId == contract.owner_id;

    if (newStatus) {
      switch (newBid.status) {
        case 'ACCEPTED': {
          if (isContractOwner && bid.status != 'PENDING')
            throw new UnauthorizedError();
          if (bid.status != 'INVITED') throw new UnauthorizedError();
          break;
        }
        case 'PENDING': {
          if (isContractOwner) throw new UnauthorizedError();
          if (bid.status !== 'EXPIRED' && bid.status !== 'DECLINED')
            throw new UnauthorizedError();
          break;
        }
        case 'DECLINED': {
          if (isContractOwner) throw new UnauthorizedError();
          if (bid.status != 'INVITED') throw new UnauthorizedError();
          break;
        }
        case 'WITHDRAWN': {
          if (isContractOwner) throw new UnauthorizedError();
          if (bid.status !== 'ACCEPTED') throw new UnauthorizedError();
          break;
        }
        case 'REJECTED': {
          if (!isContractOwner) throw new UnauthorizedError();
          if (bid.status != 'PENDING') throw new UnauthorizedError();
          break;
        }
        case 'INVITED': {
          if (!isContractOwner) throw new UnauthorizedError();
          if (
            bid.status !== 'PENDING' &&
            bid.status !== 'EXPIRED' &&
            bid.status !== 'REJECTED'
          )
            throw new UnauthorizedError();
          break;
        }
        case 'DISMISSED': {
          if (!isContractOwner) throw new UnauthorizedError();
          if (bid.status !== 'ACCEPTED') throw new UnauthorizedError();
          break;
        }
        case 'EXPIRED': {
          if (bid.status !== 'PENDING' && bid.status !== 'INVITED') throw new UnauthorizedError();
          break;
        }
        default:
          throw new BadParameterError('status', 'status');
      }
    }
    if (newAmount) {
      if (!isContractOwner && !contract.isBargaining)
        throw new UnauthorizedError();
      const status = newBid.status ?? bid.status;
      if (status === 'ACCEPTED') throw new UnauthorizedError();
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
    this.bidsService.notifyBid(contract, bid);
    if (bid.Contract) return this.ok(new ContractBidDTO(bid.toJSON()).strip());
  }

  @ApiOperationPost({
    tags: ['Bids', 'Invites'],
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
        contractId: { required: true, description: 'A Contract ID' },
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
    const bid = await this.bidsService.createBid(contractId, ownerId);
    return this.created(
      `/contracts/${bid.contract_id}/bids/${bid.id}`,
      new ContractBidDTO(bid),
    );
  }

  @ApiOperationPost({
    tags: ['Bids', 'Invites'],
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
        contractId: { required: true, description: 'A Contract ID' },
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
      throw nextFunc(
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
      throw nextFunc(new NotFoundError(contractId));
    }
    const ownerId = (this.httpContext.user as VLAuthPrincipal).id;

    const bid = await this.bidsService.inviteToBid(contractId, ownerId, userId);
    return this.created(
      `/contracts/${bid.contract_id}/bids/${bid.id}`,
      new ContractBidDTO(bid),
    );
  }
}
