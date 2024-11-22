import { Logger } from '@Utils/Logger';
import { injectable } from 'inversify';
import { ICreateOrganizationCMD } from 'vl-shared/src/schemas/orgs/OrganizationSchema';
import { Organization } from './organization.model';
import { Op } from 'sequelize';
import { BadRequestError } from '@V1/errors/BadRequest';
import { IOrgSearchCMD } from 'vl-shared/src/schemas/orgs/OrgSearchCMD';
import { optionalSet, queryLike } from '@Utils/Sequelize/queryIn';
import { OrganizationMember } from './organization_member.model';
import { OrganizationRole } from './organization_role.model';

@injectable()
export class OrganizationService {
  constructor() {
    Logger.init();
  }

  public async search(search?: IOrgSearchCMD) {
    const { limit = 10, page = 0, title, rsi_handle } = search ?? {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = {} as any;

    optionalSet(query, 'title', queryLike(title));
    optionalSet(query, 'rsi_handle', queryLike(rsi_handle));

    const pLimit = Math.min(limit ?? 0, 25);
    const orgs = await Organization.findAndCountAll({
      where: query,
      limit: pLimit,
      offset: (page ?? 0) * pLimit,
    });
    const count = await Organization.count({ where: query });
    return [null, { ...orgs, count }] as const;
  }

  public async get(id: string) {
    return Organization.scope(['members', 'roles']).findByPk(id);
  }

  public async countOwnership(owner_id: string) {
    return Organization.count({
      where: { owner_id },
    });
  }

  public async countMembership(user_id: string) {
    return OrganizationMember.count({
      where: { user_id },
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
    const newOrgEntity = await Organization.create({ ...newOrg, owner_id });

    const [OwnerRole] = await Promise.all([
      OrganizationRole.create({
        role_name: 'OWNER',
        org_id: newOrgEntity.id,
      }),
      OrganizationRole.create({
        role_name: 'ADMIN',
        org_id: newOrgEntity.id,
      }),
      OrganizationRole.create({
        role_name: 'MEMBER',
        org_id: newOrgEntity.id,
      }),
      OrganizationRole.create({
        role_name: 'JUNIOR',
        org_id: newOrgEntity.id,
      }),
    ]);

    await OrganizationMember.create({
      user_id: owner_id,
      org_id: newOrgEntity.id,
      role_id: OwnerRole.id,
    });

    const fullOrg = await Organization.scope(['members', 'roles']).findByPk(
      newOrgEntity.id,
    );
    return [null, fullOrg!];
  }
}
