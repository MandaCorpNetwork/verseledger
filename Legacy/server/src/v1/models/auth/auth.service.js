"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const inversify_1 = require("inversify");
const jsonwebtoken_1 = require("jsonwebtoken");
const types_1 = require("@Constant/types");
const Logger_1 = require("@Utils/Logger");
const auth_repository_1 = require("./auth.repository");
let AuthService = class AuthService {
    constructor() {
        Logger_1.Logger.init();
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, Buffer.from(this._envars.AUTH_SECRET, 'base64'), {
            algorithms: ['HS512'],
        });
    }
    async getUserToken(token) {
        let decoded;
        try {
            decoded = this.verifyToken(token);
        }
        catch (e) {
            Logger_1.Logger.error(e);
            return null;
        }
        const tokenDecoded = decoded;
        return tokenDecoded;
    }
    async invalidateToken(token, userId) {
        let decoded;
        try {
            decoded = this.verifyToken(token);
        }
        catch (e) {
            Logger_1.Logger.error(e);
            return false;
        }
        const tokenDecoded = decoded;
        await auth_repository_1.AuthRepository.invalidateToken({
            user_id: userId ?? tokenDecoded.id,
            token_id: tokenDecoded.jti,
        });
        return true;
    }
    async signUser(user_id) {
        return auth_repository_1.AuthRepository.createTokenPair(user_id);
    }
    async createApiToken(user_id, expires, name, roles) {
        return auth_repository_1.AuthRepository.createApiToken(user_id, expires, 'api', name, roles);
    }
    async getApiTokens(user_id) {
        return auth_repository_1.AuthRepository.getTokens(user_id);
    }
};
exports.AuthService = AuthService;
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.EnvService),
    __metadata("design:type", Object)
], AuthService.prototype, "_envars", void 0);
exports.AuthService = AuthService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], AuthService);
//# sourceMappingURL=auth.service.js.map