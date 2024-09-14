import { inject, injectable } from 'inversify';
import { Contract } from '@V1/models/contract/contract.model';
import { ContractBid } from '@V1/models/contract_bid/contract_bid.model';
import { TYPES } from '@/constant/types';
import { Location } from '@V1/models/location/location.model';
import { ContractLocation } from '@V1/models/contract/contract_locations.model';
import { Op } from 'sequelize';
import { IContractStatus } from 'vl-shared/src/schemas/ContractStatusSchema';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import {
  buildDateQuery,
  buildDurationQuery,
  optionalSet,
  queryBelow,
  queryBetween,
  queryIn,
} from '@/utils/Sequelize/queryIn';
import { Logger } from '@/utils/Logger';
import { ContractToContractDTOMapper } from './mapping/contract.mapper';
import { IContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';
import { StompService } from '@V1/services/stomp.service';
import { NotificationService } from '../notifications/notification.service';

@injectable()
export class ContractService {
  constructor() {
    Logger.init();
  }

  @inject(TYPES.StompService)
  private socket!: StompService;
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
    this.socket.publish(
      '/topic/newContract',
      ContractToContractDTOMapper.map(newContract),
    );
    return newContract;
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
    contractorRatingLimit?: number;
    payStructure?: IContractPayStructure;
    minPay?: number;
    maxPay?: number;
    isEmergency?: string;
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
      contractorRatingLimit,
      payStructure,
      minPay,
      maxPay,
      isEmergency,
    } = params ?? {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = {} as any;
    optionalSet(query, 'status', queryIn(status));
    optionalSet(query, 'subtype', queryIn(subtype));
    optionalSet(query, 'owner_user_id', queryIn(ownerId));
    optionalSet(query, 'id', queryIn(contractId));
    optionalSet(query, 'ratingLimit', queryIn(contractorRatingLimit));
    optionalSet(query, 'ratingLimit', queryBelow(contractorRatingLimit));
    optionalSet(query, 'payStructure', queryIn(payStructure));
    optionalSet(query, 'defaultPay', queryBetween(minPay, maxPay));
    //TODO: Fix this query because if the search is not sent with an emergency query specified it returns contracts not registered as Emergency
    optionalSet(query, 'isEmergency', queryIn(isEmergency === 'true'));

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
        buildDurationQuery('startDate', 'endDate', Number(duration)),
      );
    }

    const contracts = await Contract.scope([
      'bids',
      'owner',
      'locations',
      'ratings',
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

  // Notification on an updated Contract
  public async notifyContractUpdate(newContract: Contract) {
    if (!newContract.Bids) return;
    // Doesn't update users on these Status' because it is handled by the Ratings service
    const statusIgnore = ['COMPLETED', 'CANCELED'];
    if (statusIgnore.includes(newContract.status)) return;
    const notifyUser = (userId: string, contract: Contract) => {
      this.notifications.createNotification(
        userId,
        `@NOTIFICATIONS.MESSAGES.CONTRACT_UPDATED`,
        {
          type: 'link',
          link: `/ledger/contracts/${contract.id}`,
          arguments: {
            contractTitle: contract.title,
          },
        },
      );
    };
    const recievingBidStatus = ['WITHDRAWN', 'DISMISSED', 'ACCEPTED'];
    for (const bid of newContract.Bids) {
      if (recievingBidStatus.includes(bid.status)) {
        notifyUser(bid.user_id, newContract);
      }
    }
  }
}
