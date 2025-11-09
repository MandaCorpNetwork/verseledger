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
exports.ApiToken = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const IdUtil_1 = require("@Utils/IdUtil");
let ApiToken = class ApiToken extends sequelize_typescript_1.Model {
};
exports.ApiToken = ApiToken;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(IdUtil_1.IdUtil.generateSystemID),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(IdUtil_1.IdUtil.IdLength) }),
    __metadata("design:type", Object)
], ApiToken.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(IdUtil_1.IdUtil.IdLength) }),
    __metadata("design:type", Object)
], ApiToken.prototype, "user_id", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(IdUtil_1.IdUtil.IdLength) }),
    __metadata("design:type", String)
], ApiToken.prototype, "token_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('access', 'refresh', 'api') }),
    __metadata("design:type", String)
], ApiToken.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)('USER TOKEN'),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(32) }),
    __metadata("design:type", Object)
], ApiToken.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)('USER TOKEN'),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON() }),
    __metadata("design:type", Object)
], ApiToken.prototype, "roles", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Object)
], ApiToken.prototype, "expiresAt", void 0);
exports.ApiToken = ApiToken = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'api_tokens', timestamps: true })
], ApiToken);
//# sourceMappingURL=api_token.model.js.map