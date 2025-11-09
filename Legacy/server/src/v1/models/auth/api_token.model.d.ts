import { Model } from 'sequelize-typescript';
import type { CreationOptional, ForeignKey as ForeignKeyType, InferAttributes, InferCreationAttributes } from 'sequelize';
export declare class ApiToken extends Model<InferAttributes<ApiToken>, InferCreationAttributes<ApiToken>> {
    id: CreationOptional<string>;
    user_id: ForeignKeyType<string>;
    token_id: string;
    type: 'access' | 'refresh' | 'api';
    name: CreationOptional<string>;
    roles: CreationOptional<string>;
    expiresAt: CreationOptional<Date>;
}
