import { inject, injectable } from 'inversify';
import { Contract } from '@Models/contract.model';
import { ContractBid } from '@Models/contract_bid.model';
import { User } from '@Models/user.model';
import { StompService } from './stomp.service';
import { TYPES } from '@/constant/types';
import { NotFoundError } from '@Errors/NotFoundError';
import { BadRequestError } from '@Errors/BadRequest';

@injectable()
export class ContractService {
  @inject(TYPES.StompService) private stomp!: StompService;
  public async getContracts() {
    return Contract.findAll({
      include: [
        { model: User, as: 'Owner' },
        { model: ContractBid, as: 'Bids', include: ['User'] },
      ],
    });
  }
  public async getContract(
    contractId: string,
    include: string[] = ['bids', 'owner'],
  ) {
    return await Contract.scope(include).findByPk(contractId);
  }
  public async createContract(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contract: any & { owner_id: number },
  ) {
    const newContract = await Contract.create(contract);
    this.stomp.client.publish({
      destination: '/topic/newContract',
      body: JSON.stringify(newContract.toJSON()),
    });
    return newContract;
  }

  public async getBid(contractId: string, bidId: string) {
    const bid = await ContractBid.findOne({
      where: { id: bidId, contract_id: contractId },
    });
    if (bid == null) throw new NotFoundError(bidId);
    return bid;
  }

  public async createBid(contractId: string, userId: string) {
    const contract = await Contract.scope(['owner', 'bids']).findByPk(
      contractId,
    );
    if (contract == null) throw new NotFoundError(contractId);
    if (contract.status !== 'BIDDING')
      throw new BadRequestError(
        'Bids are Closed for this contract',
        'invalid_status',
      );
    if (contract.Owner.id === userId)
      throw new BadRequestError(
        'You can not bid on your own contract.',
        'resource_ownership',
      );
    if (contract.Bids.map((bid) => bid.user_id).includes(userId))
      throw new BadRequestError(
        'You have already bid on this contract',
        'duplicate_entry',
      );
    if (
      contract.contractorLimit !== 0 &&
      contract.Bids.length >= contract.contractorLimit
    )
      throw new BadRequestError(
        'The Contractor Limit has been reached',
        'contractor_limit',
      );
    const bid = await ContractBid.create({
      contract_id: contractId,
      user_id: userId,
      status: 'PENDING',
    });
    this.stomp.client.publish({
      destination: `/topic/newBid`,
      body: JSON.stringify(bid.toJSON()),
    });
    return bid;
  }
}
