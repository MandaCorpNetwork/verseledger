"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createId = exports.IDPrefix = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
var IDPrefix;
(function (IDPrefix) {
    IDPrefix["System"] = "X-";
    IDPrefix["User"] = "U-";
})(IDPrefix || (exports.IDPrefix = IDPrefix = {}));
const createId = (prefix = IDPrefix.System) => {
    return `${prefix}${(0, cuid2_1.createId)()}`;
};
exports.createId = createId;
//# sourceMappingURL=createId.js.map