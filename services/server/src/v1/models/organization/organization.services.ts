import { Logger } from '@Utils/Logger';
import { injectable } from 'inversify';
import { ICreateOrganizationCMD } from 'vl-shared/src/schemas/orgs/OrganizationSchema';
import { Organization } from './organization.model';
import { Op } from 'sequelize';
import { BadRequestError } from '@V1/errors/BadRequest';

@injectable()
export class OrganizationService {
  constructor() {
    Logger.init();
  }

  public async countOwnership(owner_id: string) {
    return Organization.count({
      where: { owner_id },
    });
  }

  public async createOrg(
    newOrg: ICreateOrganizationCMD,
    owner_id: string,
  ): Promise<[null, Organization]>;
  public async createOrg(
    newOrg: ICreateOrganizationCMD,
    owner_id: string,
  ): Promise<[BadRequestError, null]>;
  public async createOrg(
    newOrg: ICreateOrganizationCMD,
    owner_id: string,
  ): Promise<[null, Organization] | [BadRequestError, null]> {
    if (
      (await Organization.count({
        where: {
          [Op.or]: [{ title: newOrg.title }, { rsi_handle: newOrg.rsi_handle }],
        },
      })) > 0
    ) {
      return [new BadRequestError(`Name or RSI Handle already taken`), null];
    }
    return [null, await Organization.create({ ...newOrg, owner_id })];
  }
}
