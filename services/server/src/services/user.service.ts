import { injectable } from 'inversify';
import { User } from '@Models/user.model';
import { IUser } from '@Interfaces/IUser';
import { Op } from 'sequelize';
import { RSIService } from './RSI.service';
import { UserValidation } from '@Models/user_validation.model';

@injectable()
export class UserService {
  public async getUser(id: string, scopes: string | string[] = []) {
    return await User.scope(scopes).findByPk(id);
  }

  public async findOrCreateUserByDiscord(
    id: string,
    handle?: string,
    pfp?: string,
  ) {
    const [user] = await User.scope('discord').findOrCreate({
      where: { discord_id: id },
      defaults: { discord_id: id, pfp, rsi_handle: handle },
    });
    return user;
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
    console.log(response.status, response.data);
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
}
