import { inject, injectable } from 'inversify';
import { Contract } from '@V1/models/contract/contract.model';
import { ContractBid } from '@V1/models/contract_bid/contract_bid.model';
import { TYPES } from '@/constant/types';
import { NotFoundError } from '@V1/errors/NotFoundError';
import { BadRequestError } from '@V1/errors/BadRequest';
import { Location } from '@V1/models/location/location.model';
import { ContractLocation } from '@V1/models/contract/contract_locations.model';
import { User } from '@V1/models/user/user.model';
import { Op } from 'sequelize';
import { IContractStatus } from 'vl-shared/src/schemas/ContractStatusSchema';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
<<<<<<< HEAD
import {
  buildDateQuery,
  buildDurationQuery,
  optionalSet,
  queryIn,
} from '@/utils/Sequelize/queryIn';
=======
import { buildDateQuery, buildDurationQuery, optionalSet, queryIn } from '@/utils/Sequelize/queryIn';
>>>>>>> 847644e6 (Added date queries to the service)
import { type NotificationService } from '../notifications/notification.service';
import { ContractBidDTO } from '@V1/models/contract_bid/mapping/ContractBidDTO';
import { Logger } from '@/utils/Logger';
import { ContractMapper } from './mapping/contract.mapper';

@injectable()
export class ContractService {
  constructor() {
    Logger.init();
  }

  @inject(TYPES.NotificationService)
  private notifications!: NotificationService;
  public async getContracts() {
    return Contract.scope(['locations', 'owner', 'bids']).findAll();
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
    const newTempContract = await Contract.create(contract);
    const locations: Array<{ location: string; tag: string }> =
      contract.Locations ?? [];
    for (const l of locations)
      await this.addLocationToContract(newTempContract, l.location, l.tag);
    const newContract = (await Contract.scope([
      'locations',
      'owner',
      'bids',
    ]).findByPk(newTempContract.id)) as Contract;
    this.notifications.publish(
      '/topic/newContract',
      ContractMapper.toDTO(newContract),
    );
    return newContract;
  }

  public async getBid(contractId: string, bidId: string, scope: string[] = []) {
    const bid = await ContractBid.scope(scope).findOne({
      where: { id: bidId, contract_id: contractId },
    });
    if (bid == null) throw new NotFoundError(bidId);
    return bid;
  }

  public async addLocationToContract(
    contract: Contract | string,
    location: Location | string,
    tag: string = 'other',
  ) {
    const contract_id = typeof contract === 'string' ? contract : contract.id;
    const location_id = typeof location === 'string' ? location : location.id;
    return ContractLocation.create({ location_id, contract_id, tag });
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
    if (contract.Owner.id === userId)
      throw new BadRequestError(
        'You can not bid on your own contract.',
        'resource_ownership',
      );
    const isPending = contract.Bids.filter((bid) => bid.status == 'INVITED')
      .map((bid) => bid.user_id)
      .includes(userId);
    if (isPending) {
      const bid = await ContractBid.scope('user').findOne({
        where: { user_id: userId, contract_id: contract.id },
      });
      if (bid == null) throw new Error('Something went Wrong');
      const newBid = await bid.set('status', 'ACCEPTED').save();
      //TODO: Notification
      return newBid;
    }
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
      amount,
    });
    this.notifications.publish('/topic/newBid', new ContractBidDTO(bid));
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

    if (contract.Owner.id !== ownerId)
      throw new BadRequestError(
        'You do not have permission to Invite on this contract',
        'bad_permissions',
      );
    if (contract.Owner.id === userId)
      throw new BadRequestError(
        'You can not invite yourself.',
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
    this.notifications.publish(
      `/topic/notifications/${userId}`,
      `You have been invited to ${contract.title} by ${ownerUser.displayName}`,
    );
    return bid;
  }

  public async searchBySubtypes(subtype: string[]) {
    try {
      const contracts = await Contract.findAll({
        where: {
          subtype: {
            [Op.in]: subtype,
          },
        },
        include: ['Locations', 'Owner', 'Bids'],
      });
      return contracts;
    } catch (error) {
      console.error('Error in Contract Service Method', error);
    }
  }

  public async search(params: {
    subtype?: string | string[];
    status?: IContractStatus | IContractStatus[];
    ownerId?: string | string[];
    contractId?: string | string[];
    bidDate?: { before?: Date; after?: Date; exact?: Date };
    startDate?: { before?: Date; after?: Date; exact?: Date };
    endDate?: { before?: Date; after?: Date; exact?: Date };
    duration?: number;
    limit?: number;
    page?: number;
  }) {
    const {
      subtype,
      limit = 10,
      page = 0,
      status,
      ownerId,
      contractId,
      bidDate,
      startDate,
      endDate,
      duration,
    } = params ?? {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = {} as any;
    optionalSet(query, 'status', queryIn(status));
    optionalSet(query, 'subtype', queryIn(subtype));
    optionalSet(query, 'owner_user_id', queryIn(ownerId));
    optionalSet(query, 'id', queryIn(contractId));

    if (bidDate) {
      Object.assign(query, buildDateQuery('bidDate', bidDate));
    }
    if (startDate) {
      Object.assign(query, buildDateQuery('startDate', startDate));
    }
    if (endDate) {
      Object.assign(query, buildDateQuery('endDate', endDate));
    }

    if (duration) {
      Object.assign(
        query,
        buildDurationQuery('startDate', 'endDate', duration),
      );
    }

    const contracts = await Contract.scope([
      'bids',
      'owner',
      'locations',
    ]).findAndCountAll({
      where: query,
      limit: Math.min(limit, 25),
      offset: page * Math.min(limit, 25),
    });

    //TODO: This needs a proper workaround
    const count = await Contract.scope(['bids', 'owner', 'locations']).count({
      where: query,
    });

    return { ...contracts, count };
  }

  public async getContractsByUserId(
    userId: string,
    bidStatus?: IContractBid['status'],
  ) {
    const contractBids = await ContractBid.findAll({
      where: {
        user_id: userId,
        status: bidStatus ? bidStatus : { [Op.ne]: 'REJECTED' },
      },
    });
    const contractIds = contractBids.map((bid) => bid.contract_id);
    const contracts = await Contract.findAll({
      where: {
        id: {
          [Op.in]: contractIds,
        },
      },
    });
    return contracts;
  }
}
