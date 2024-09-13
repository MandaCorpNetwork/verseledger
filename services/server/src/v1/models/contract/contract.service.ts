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

  // A Notification that gets sent out when there are Multiple Updates
  public async notifyContractMultiUpdates(_contract: Contract) {
    if (!_contract.Bids) return;
    for (const bid of _contract.Bids) {
      if (bid.status === 'ACCEPTED') {
        this.notifications.createNotification(
          bid.user_id,
          `@NOTIFICATIONS.MESSAGES.CONTRACT_UPDATES`,
          {
            type: 'link',
            link: `/ledger/contracts/${_contract.id}`,
            arguments: {
              contractTitle: _contract.title,
            },
          },
        );
      }
    }
  }

  // A Generic Notification Constructor for any singular Contract Update
  public async notifyGenericContractUpdate(_contract: Contract, key?: string, value?: string) {
    if (!_contract.Bids) return;

    // Check if Key is set to decide if to send a Generic Message or Specific Message
    const message = key
      ? '@NOTIFICATIONS.MESSAGES.CONTRACT_SPECIFIC_UPDATE'
      : '@NOTIFICATIONS.MESSAGES.CONTRACT_GENERIC_UPDATE';
    for (const bid of _contract.Bids) {
      if (bid.status === 'ACCEPTED') {
        this.notifications.createNotification(
          bid.user_id,
          message,
          {
            type: 'link',
            link: `/ledger/contracts/${_contract.id}`,
            arguments: {
              contractTitle: _contract.title,
              changedKey: key || null,
              changedValue: value || null,
            },
          },
        );
      }
    }
  }

  // Method to determine the Update(s) made and send out the appropriate Notification
  public async notifyContractUpdate(
    _currentContract: Contract,
    _newContract: Contract,
  ) {
    if (!_newContract.Bids) return;
    const changedFields: string[] = [];

    // For Loop to check which fields have changed and push the key to an array
    for (const key in _newContract) {
      const contractKey = key as keyof Contract;
      if (_newContract[contractKey] !== _currentContract[contractKey]) {
        changedFields.push(contractKey);
      }
    }

    // A Value to check if only the Status Changed.
    // When a Status Changes it sends a corresponding Date update with it
    const statusChanged =
      changedFields.length === 2 && changedFields.includes('status');
    
    // Checks if more than One field has changed.
    // Decides whether to send a GenericUpdate or MultiUpdate Notif
    if (changedFields.length > 1) {
      // Catch if the Multiple Fields is just a Status Update
      if (statusChanged) {
        // Checks if the Status is a completed status, which is handled by the Ratings Controller
        if (
          _newContract.status !== 'COMPLETED' &&
          _newContract.status !== 'CANCELED'
        ) {
          // Pass a custom string for 'In Progress'
          const _status =
            _newContract.status === 'INPROGRESS'
              ? 'In Progress'
              : _newContract.status
                  .toLowerCase()
                  .replace(/^\w/, (c) => c.toUpperCase());
          this.notifyGenericContractUpdate(_newContract, 'Status', _status);
        }
        // Returns if it's just a Status Update
        return;
      }
      // Uses the MultiUpdate Notif if it's not a Status Update
      this.notifyContractMultiUpdates(_newContract);
    } else {
      // If it is a singular update we use a Switch to Dictate the Correct String Value to be sent
      switch (changedFields[0]) {
        case 'defaultPay': {
          // Check the Pay Structure for appropriate String
          const getValueString = () => {
            if (_newContract.payStructure === 'FLATRATE') {
              return `¤ ${_newContract.defaultPay.toLocaleString()}`;
            } else if (_newContract.payStructure === 'HOURLY') {
              return `¤ ${_newContract.defaultPay.toLocaleString()} /HR`;
            } else if (_newContract.payStructure === 'POOL') {
              return `${_newContract.defaultPay} %`;
            }
            return _newContract.defaultPay.toLocaleString();
          };
          const valueString = getValueString();
          return this.notifyGenericContractUpdate(
            _newContract,
            'Default Pay',
            valueString,
          );
        }
        case 'payStructure': {
          const label = _newContract.payStructure
            .toLowerCase()
            .replace(/^\w/, (c) => c.toUpperCase());
          return this.notifyGenericContractUpdate(
            _newContract,
            'Pay Structure',
            label,
          );
        }
        case 'isBonusPay': {
          const label = _newContract.isBonusPay ? 'Included' : 'Removed';
          return this.notifyGenericContractUpdate(
            _newContract,
            'Bonus Pay',
            label,
          );
        }
        case 'isBargaining': {
          const label = _newContract.isBargaining
            ? 'Negotiable'
            : 'Non Negotiable';
          return this.notifyGenericContractUpdate(
            _newContract,
            'Negotiation',
            label,
          );
        }
        case 'contractorLimit': {
          return this.notifyGenericContractUpdate(
            _newContract,
            'Contractor Limit',
            _newContract.contractorLimit.toString(),
          );
        }
        case 'startDate': {
          // Check if the Date change is Before or After the current set date
          const label =
            _newContract.startDate < _currentContract.startDate
              ? 'Sooner'
              : 'Later';
          return this.notifyGenericContractUpdate(
            _newContract,
            'Start Date',
            label,
          );
        }
        case 'endDate': {
          // Check if the Date change is Before or After the current set date
          const label =
            _newContract.endDate < _currentContract.endDate
              ? 'Sooner'
              : 'Later';
          return this.notifyGenericContractUpdate(
            _newContract,
            'End Date',
            label,
          );
        }
        case 'bidDate': {
          // Check if the Date change is Before or After the current set date
          const label =
            _newContract.bidDate < _currentContract.bidDate
              ? 'Sooner'
              : 'Later';
          return this.notifyGenericContractUpdate(
            _newContract,
            'Bid End Date',
            label,
          );
        }
        case 'ratingLimit':
          return this.notifyGenericContractUpdate(
            _newContract,
            'Rating Limit',
            _newContract.ratingLimit.toString(),
          );
        // Return a generic update for anything else which is deemed not important
        default:
          return this.notifyGenericContractUpdate(_newContract);
      }
    }
  }
}
