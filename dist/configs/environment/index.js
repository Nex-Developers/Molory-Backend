"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const tslib_1 = require("tslib");
const environment_1 = (0, tslib_1.__importDefault)(require("./environment"));
const environment_prod_1 = (0, tslib_1.__importDefault)(require("./environment.prod"));
const env = process.env.MY_ENV == 'production' ? environment_prod_1.default : environment_1.default;
exports.env = env;
//# sourceMappingURL=index.js.map