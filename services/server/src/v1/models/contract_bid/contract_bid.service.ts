import { inject, injectable } from 'inversify';
import { Contract } from '@V1/models/contract/contract.model';
import { ContractBid } from '@V1/models/contract_bid/contract_bid.model';
import { TYPES } from '@/constant/types';
import { NotFoundError } from '@V1/errors/NotFoundError';
import { BadRequestError } from '@V1/errors/BadRequest';
import { User } from '@V1/models/user/user.model';
import { ContractBidDTO } from '@V1/models/contract_bid/mapping/ContractBidDTO';
import { Logger } from '@/utils/Logger';
import { StompService } from '@V1/services/stomp.service';

@injectable()
export class ContractBidsService {
  constructor() {
    Logger.init();
  }

  @inject(TYPES.StompService)
  private socket!: StompService;

  public async getBid(contractId: string, bidId: string, scope: string[] = []) {
    const bid = await ContractBid.scope(scope).findOne({
      where: { id: bidId, contract_id: contractId },
    });
    if (bid == null) throw new NotFoundError(bidId);
    return bid;
  }

  public async createBid(contractId: string, userId: string, amount?: number) {
    const contract = await Contract.scope(['owner', 'bids']).findByPk(
      contractId,
    );
    if (contract == null) throw new NotFoundError(contractId);

    amount ??= contract.defaultPay;

    if (contract.status !== 'BIDDING')
      throw new BadRequestError(
        'Bids are Closed for this contract',
        'invalid_status',
      );
    if (contract?.Owner?.id === userId)
      throw new BadRequestError(
        'You can not bid on your own contract.',
        'resource_ownership',
      );
    const isPending =
      contract?.Bids?.filter((bid) => bid.status == 'INVITED')
        ?.map((bid) => bid.user_id)
        ?.includes(userId) ?? false;
    if (isPending) {
      const bid = await ContractBid.scope('user').findOne({
        where: { user_id: userId, contract_id: contract.id },
      });
      if (bid == null) throw new Error('Something went Wrong');
      const newBid = await bid.set('status', 'ACCEPTED').save();
      //TODO: Notification
      return newBid;
    }
    if (contract?.Bids?.map((bid) => bid.user_id)?.includes(userId))
      throw new BadRequestError(
        'You have already bid on this contract',
        'duplicate_entry',
      );
    if (
      contract.contractorLimit !== 0 &&
      (contract?.Bids?.length ?? 0) >= contract.contractorLimit
    )
      throw new BadRequestError(
        'The Contractor Limit has been reached',
        'contractor_limit',
      );
    const bid = await ContractBid.create({
      contract_id: contractId,
      user_id: userId,
      status: 'PENDING',
      amount,
    });
    this.socket.publish('/topic/newBid', new ContractBidDTO(bid));
    return bid;
  }

  public async inviteToBid(
    contractId: string,
    ownerId: string,
    userId: string,
    amount?: number,
  ) {
    const contract = await Contract.scope(['owner', 'bids']).findByPk(
      contractId,
    );
    if (contract == null) throw new NotFoundError(contractId);

    amount ??= contract.defaultPay;

    if (contract?.Owner?.id !== ownerId)
      throw new BadRequestError(
        'You do not have permission to Invite on this contract',
        'bad_permissions',
      );
    if (contract?.Owner?.id === userId)
      throw new BadRequestError(
        'You can not invite yourself.',
        'resource_ownership',
      );
    if (contract?.Bids?.map((bid) => bid.user_id)?.includes(userId))
      throw new BadRequestError(
        'You have already bid on this contract',
        'duplicate_entry',
      );
    if (
      contract.contractorLimit !== 0 &&
      (contract?.Bids?.length ?? 0) >= contract.contractorLimit
    )
      throw new BadRequestError(
        'The Contractor Limit has been reached',
        'contractor_limit',
      );

    const invitedUser = await User.findByPk(userId);
    if (invitedUser == null) throw new BadRequestError('User does not exist');
    const ownerUser = await User.findByPk(ownerId);
    if (ownerUser == null) throw new BadRequestError('User does not exist');
    const bid = await ContractBid.create({
      contract_id: contractId,
      user_id: userId,
      status: 'INVITED',
      amount,
    });
    this.socket.publish(
      `/topic/notifications/${userId}`,
      `You have been invited to ${contract.title} by ${ownerUser.displayName}`,
    );
    return bid;
  }
}
