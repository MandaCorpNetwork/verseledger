import { injectable } from 'inversify';
import { User } from '@V1/models/user/user.model';
import { Op } from 'sequelize';
import { RSIService } from '@V1/services/RSI.service';
import { UserValidation } from '@V1/models/user/user_validation.model';
import { Logger } from '@/utils/Logger';
import { IUser } from 'vl-shared/src/schemas/UserSchema';
import { ContractBid } from '@V1/models/contract_bid/contract_bid.model';
import { IContractBidStatus } from 'vl-shared/src/schemas/ContractBidStatusSchema';
import { optionalSet, queryIn } from '@/utils/Sequelize/queryIn';
import { UserAuth } from '../auth/user_auth.model';

@injectable()
export class UserService {
  constructor() {
    Logger.init();
  }
  public async getUser(id: string, scopes: string | string[] = []) {
    return await User.scope(scopes).findByPk(id);
  }

  public async getUserBids(
    id: string,
    search: {
      status?: IContractBidStatus | IContractBidStatus[];
      limit?: number;
      contractId?: string | string[];
      page?: number;
    },
  ) {
    const { status, contractId, limit = 25, page = 0 } = search ?? {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = {} as any;

    optionalSet(query, 'status', queryIn(status));
    optionalSet(query, 'contract_id', queryIn(contractId));
    const bids = await ContractBid.scope(['contract']).findAndCountAll({
      where: {
        ...query,
        user_id: id,
      },
      limit: Math.min(limit, 25),
      offset: page * Math.min(limit, 25),
    });

    //TODO: This needs a proper workaround
    const count = await ContractBid.scope(['contract']).count({
      where: {
        ...query,
        user_id: id,
      },
    });

    return { ...bids, count };
  }

  public async findOrCreateUser(
    identifier: string,
    type: UserAuth['type'],
    handle?: string,
    pfp?: string,
  ) {
    const auth = await UserAuth.findOne({
      where: {
        identifier,
        type,
      },
    });
    if (auth) {
      return { newUser: false, user: await auth.getUser() };
    } else {
      const user = await User.create({
        pfp,
        handle,
      });
      await UserAuth.create({ identifier, type, user_id: user.id });
      return { newUser: true, user };
    }
  }

  public async updateUser(id: string, data: Partial<IUser>) {
    const user = await this.getUser(id);
    if (user == null) return false;
    for (const key in data) {
      user.set(key, data[key as keyof IUser]);
    }
    await user
      .save()
      .then((u) => u)
      .catch(() => false);
  }

  public async deleteUser(id: string) {
    const user = await this.getUser(id);
    if (!user) return false;
    return user
      .destroy()
      .then(() => true)
      .catch(() => false);
  }

  public async findUsers(handle: string, limit: number = 10) {
    const users = await User.findAll({
      where: handle
        ? {
            rsi_handle: {
              [Op.substring]: handle,
            },
          }
        : undefined,
      limit: Math.max(1, Math.min(limit)),
    });
    return users;
  }

  public async getValidationToken(userId: string) {
    return UserValidation.findOne({
      where: { user_id: userId, expiresAt: { [Op.gt]: new Date(Date.now()) } },
    });
  }

  public async createValidationToken(userId: string, handle: string) {
    const response = await RSIService.getUserByHandle(handle);
    const rsiUser = response?.data?.data?.creator;
    if (rsiUser == null) throw new Error('Invalid Handle');
    const validation = await UserValidation.findOne({
      where: { user_id: userId, handle, expiresAt: { [Op.gt]: new Date() } },
    });
    if (validation != null) throw new Error('Existing Token');
    return await UserValidation.create({
      user_id: userId,
      handle: rsiUser.nickname,
      pfp: rsiUser.thumbnailUrl,
    });
  }

  public async validateUser(userId: string) {
    const validation = await UserValidation.findOne({
      where: { user_id: userId },
    });
    if (validation == null) throw new Error('No Valid Validation Token');
    const response = await RSIService.getUserByHandle(validation.handle);
    const rsiUser = response?.data?.data?.creator;
    if (rsiUser == null) throw new Error('Invalid Handle');
    const user = await User.findByPk(userId);
    if (user == null) throw new Error('What the Fuck?');
    if (rsiUser.bio.includes(validation.id)) {
      const newUser = await user.update({
        verified: true,
        handle: validation.handle,
        displayName: rsiUser.displayName,
        pfp: rsiUser.thumbnailUrl,
      });
      await validation.destroy();
      return newUser;
    } else {
      throw new Error('Token not found in Short Bio');
    }
  }

  public async search(name: string) {
    const isHandle = name.startsWith('@');
    const handle = isHandle ? name.slice(1) : name;
    const multiSearch = {
      [Op.or]: {
        handle: { [Op.like]: `%${handle}%` },
        displayName: { [Op.like]: `%${handle}%` },
      },
    };
    const handleSearch = {
      [Op.or]: {
        handle: { [Op.like]: `%${handle}%` },
      },
    };
    const users = User.findAll({
      limit: 8,
      order: [['handle', 'ASC']],
      where: { ...(isHandle ? handleSearch : multiSearch), verified: true },
    });
    return users;
  }
}
