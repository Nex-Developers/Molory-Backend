"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicleTypeController = exports.getVehicleTypesController = exports.deleteVehicleTypeController = exports.patchVehicleTypeController = exports.postVehicleTypeController = void 0;
const tslib_1 = require("tslib");
const vehicle_type_1 = require("../../core/use-cases/vehicle-type");
const delete_1 = (0, tslib_1.__importDefault)(require("./delete"));
const get_item_1 = (0, tslib_1.__importDefault)(require("./get-item"));
const get_items_1 = (0, tslib_1.__importDefault)(require("./get-items"));
const patch_1 = (0, tslib_1.__importDefault)(require("./patch"));
const post_1 = (0, tslib_1.__importDefault)(require("./post"));
const postVehicleTypeController = (0, post_1.default)({ addVehicleType: vehicle_type_1.addVehicleType });
exports.postVehicleTypeController = postVehicleTypeController;
const patchVehicleTypeController = (0, patch_1.default)({ editVehicleType: vehicle_type_1.editVehicleType });
exports.patchVehicleTypeController = patchVehicleTypeController;
const deleteVehicleTypeController = (0, delete_1.default)({ removeVehicleType: vehicle_type_1.removeVehicleType });
exports.deleteVehicleTypeController = deleteVehicleTypeController;
const getVehicleTypesController = (0, get_items_1.default)({ listVehicleTypes: vehicle_type_1.listVehicleTypes });
exports.getVehicleTypesController = getVehicleTypesController;
const getVehicleTypeController = (0, get_item_1.default)({ listVehicleTypeInfos: vehicle_type_1.listVehicleTypeInfos });
exports.getVehicleTypeController = getVehicleTypeController;
//# sourceMappingURL=index.js.map