"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigurationsController = exports.postConfigurationController = void 0;
const tslib_1 = require("tslib");
const configuration_1 = require("../../core/use-cases/configuration");
const get_items_1 = (0, tslib_1.__importDefault)(require("./get-items"));
const post_1 = (0, tslib_1.__importDefault)(require("./post"));
const postConfigurationController = (0, post_1.default)({ setConfiguration: configuration_1.setConfiguration });
exports.postConfigurationController = postConfigurationController;
const getConfigurationsController = (0, get_items_1.default)({ listUserConfigurations: configuration_1.listUserConfigurations });
exports.getConfigurationsController = getConfigurationsController;
//# sourceMappingURL=index.js.map