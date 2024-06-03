import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  next,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import { ContractService } from '@Services/contracts.service';
import { NextFunction } from 'express';
import { BodyError } from '@/errors/BodyError';
import { VLAuthPrincipal } from '@/authProviders/VL.principal';
import { CreateContractValidator } from '@/validators/contract.validator';
import { IdUtil } from '@/utils/IdUtil';
import { BadParameterError } from '@Errors/BadParameter';
import { NotFoundError } from '@Errors/NotFoundError';

@controller('/v1/contracts')
export class ContractController extends BaseHttpController {
  constructor(
    @inject(TYPES.ContractService) private contractService: ContractService,
  ) {
    super();
  }

  @httpPost('/', TYPES.VerifiedUserMiddleware)
  private async createContract(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @requestBody() body: any,
    @next() nextFunc: NextFunction,
  ) {
    try {
      const dto = body;
      const model = CreateContractValidator.strict().parse(dto);
      try {
        const newContract = await this.contractService.createContract({
          ...model,
          owner_id: (this.httpContext.user as VLAuthPrincipal).id,
        });
        return this.created(`/contracts/${newContract.id}`, newContract);
      } catch (error) {
        throw nextFunc(error);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw nextFunc(new BodyError(error.issues));
    }
  }

  @httpGet('/')
  private getContracts() {
    return this.contractService.getContracts();
  }

  @httpGet(`/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})`)
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
    return contract;
  }

  @httpGet(
    `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids`,
  )
  private async getContractBids(
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
    return contract.Bids;
  }

  @httpGet(
    `/:contractId(${IdUtil.expressRegex(IdUtil.IdPrefix.Contract)})/bids/:bidId(${IdUtil.expressRegex(IdUtil.IdPrefix.Bid)})`,
  )
  private async getSingleContractBid(
    @requestParam('contractId') contractId: string,
    @requestParam('contractId') bidId: string,
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
    return bid;
  }

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
    const userId = (this.httpContext.user as VLAuthPrincipal).id;
    const bid = await this.contractService.createBid(contractId, userId);
    return this.created(`/contracts/${bid.contract_id}/bids/${bid.id}`, bid);
  }
}
