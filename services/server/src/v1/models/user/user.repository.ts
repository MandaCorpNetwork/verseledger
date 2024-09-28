import { injectable } from 'inversify';
import { User } from './user.model';
import { QueryTypes } from 'sequelize';
@injectable()
export class UserRepository {
  public static async updateUserRating(userId: string) {
    try {
      const user = await User.findByPk(userId);
      if (user == null) return null;
      const response = (await User.sequelize?.query(
        'CALL calculate_user_rating (:userId)',
        {
          replacements: { userId },
          type: QueryTypes.SELECT,
        },
      )) as [
        {
          '0': {
            weighted_rating: number;
          };
        },
        {
          '0': {
            display_rating: number;
          };
        },
        {
          '0': {
            total_rating: number;
          };
        },
        {
          fieldCount: number;
          affectedRows: number;
          insertId: number;
          info: string;
          serverStatus: number;
          warningStatus: number;
          changedRows: number;
        },
      ];
      const weighted_rating = response[0][0].weighted_rating;
      const display_rating = response[1][0].display_rating;
      const total_rating = response[2][0].total_rating;
      user.setDataValue('weighted_rating', weighted_rating);
      user.setDataValue('display_rating', display_rating);
      user.setDataValue('total_ratings', total_rating);
      await user.save();
      return user;
    } catch (_) {
      return null;
    }
  }
}
