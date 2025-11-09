"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const inversify_1 = require("inversify");
const api_token_model_1 = require("./api_token.model");
const IdUtil_1 = require("@Utils/IdUtil");
const jsonwebtoken_1 = require("jsonwebtoken");
const ms_1 = require("ms");
const env_service_1 = require("@V1/services/env.service");
const sequelize_1 = require("sequelize");
const ApiPermission_1 = require("vl-shared/src/enum/ApiPermission");
const env = new env_service_1.EnvService();
let AuthRepository = class AuthRepository {
    static { AuthRepository_1 = this; }
    static ApiToken = api_token_model_1.ApiToken;
    static async invalidateToken(token) {
        await AuthRepository_1.ApiToken.destroy({
            where: { user_id: token.user_id, token_id: token.token_id },
        });
        return true;
    }
    static async createApiToken(user_id, expires = '1h', type = 'access', name = 'USER TOKEN', roles = [ApiPermission_1.ApiPermission.ADMIN], jwtid = IdUtil_1.IdUtil.generateSystemID()) {
        const expiresRange = typeof expires === 'string' ? (0, ms_1.default)(expires) : new Date(expires).getTime();
        const expiresAt = new Date(Date.now() + expiresRange);
        const token = jsonwebtoken_1.default.sign({ id: user_id, type, roles }, Buffer.from(env.AUTH_SECRET, 'base64'), {
            algorithm: 'HS512',
            jwtid,
            audience: 'verseledger.net',
            issuer: 'api.verseledger.net',
            expiresIn: (0, ms_1.default)(expiresRange),
            subject: user_id,
        });
        const newToken = await AuthRepository_1.ApiToken.create({
            user_id,
            name,
            type: type,
            token_id: jwtid,
            roles: JSON.stringify(roles),
            expiresAt,
        });
        return { ...newToken.toJSON(), token };
    }
    static async createTokenPair(user_id, jwtid = IdUtil_1.IdUtil.generateSystemID()) {
        const [accessToken, refreshToken] = await Promise.all([
            AuthRepository_1.createApiToken(user_id, '1h', 'access', undefined, [ApiPermission_1.ApiPermission.ADMIN], jwtid),
            AuthRepository_1.createApiToken(user_id, '2d', 'refresh', undefined, [ApiPermission_1.ApiPermission.ADMIN], jwtid),
        ]);
        return { accessToken, refreshToken };
    }
    static async getTokens(user, type = 'api') {
        return api_token_model_1.ApiToken.findAll({
            where: { user_id: user, type, expiresAt: { [sequelize_1.Op.gte]: Date.now() } },
        });
    }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = AuthRepository_1 = __decorate([
    (0, inversify_1.injectable)()
], AuthRepository);
//# sourceMappingURL=auth.repository.js.map