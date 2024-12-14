import { Logger } from '@Utils/Logger';
import { injectable } from 'inversify';
import type { ICreateOrganizationCMD } from 'vl-shared/src/schemas/orgs/OrganizationSchema';
import { Organization } from './organization.model';
import { Op } from 'sequelize';
import { BadRequestError } from '@V1/errors/BadRequest';
import type { IOrgSearchCMD } from 'vl-shared/src/schemas/orgs/OrgSearchCMD';
import { optionalSet, queryLike } from '@Utils/Sequelize/queryIn';
import { OrganizationMember } from './organization_member.model';
import { OrganizationRank } from './organization_rank.model';

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
    return Organization.scope(['members', 'ranks']).findByPk(id);
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

    const [OwnerRank] = await Promise.all([
      OrganizationRank.create({
        rank_name: 'OWNER',
        org_id: newOrgEntity.id,
      }),
      OrganizationRank.create({
        rank_name: 'OFFICER',
        org_id: newOrgEntity.id,
      }),
      OrganizationRank.create({
        rank_name: 'MEMBER',
        org_id: newOrgEntity.id,
      }),
      OrganizationRank.create({
        rank_name: 'RECRUIT',
        org_id: newOrgEntity.id,
      }),
    ]);

    await OrganizationMember.create({
      user_id: owner_id,
      org_id: newOrgEntity.id,
      rank_id: OwnerRank.id,
    });

    const fullOrg = await Organization.scope(['members', 'ranks']).findByPk(
      newOrgEntity.id,
    );
    return [null, fullOrg!];
  }
}
