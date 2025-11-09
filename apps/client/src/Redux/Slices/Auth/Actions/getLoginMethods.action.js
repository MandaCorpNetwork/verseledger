"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoginMethods = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const URLUtil_1 = require("@Utils/URLUtil");
const axios_1 = require("axios");
exports.getLoginMethods = (0, toolkit_1.createAsyncThunk)('GET_LOGIN_METHODS', async () => {
    const response = await axios_1.default.get(`${URLUtil_1.URLUtil.backendHost}/auth/login`);
    return response;
});
//# sourceMappingURL=getLoginMethods.action.js.map