"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoutesController = exports.getRouteController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("../../core/use-cases/route");
const get_item_1 = (0, tslib_1.__importDefault)(require("./get-item"));
const get_items_1 = (0, tslib_1.__importDefault)(require("./get-items"));
const getRouteController = (0, get_item_1.default)({ listRouteInfos: route_1.listRouteInfos });
exports.getRouteController = getRouteController;
const getRoutesController = (0, get_items_1.default)({ listRoutes: route_1.listRoutes });
exports.getRoutesController = getRoutesController;
//# sourceMappingURL=index.js.map