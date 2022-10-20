"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchTripConfirmController = exports.postTripController = exports.getTripsController = void 0;
const tslib_1 = require("tslib");
const trip_1 = require("../../core/use-cases/trip");
const get_items_1 = (0, tslib_1.__importDefault)(require("./get-items"));
const patch_confirm_1 = (0, tslib_1.__importDefault)(require("./patch-confirm"));
const post_1 = (0, tslib_1.__importDefault)(require("./post"));
const getTripsController = (0, get_items_1.default)({ listTrips: trip_1.listTrips });
exports.getTripsController = getTripsController;
const postTripController = (0, post_1.default)({ addTrip: trip_1.addTrip });
exports.postTripController = postTripController;
const patchTripConfirmController = (0, patch_confirm_1.default)({ confirmTrip: trip_1.confirmTrip });
exports.patchTripConfirmController = patchTripConfirmController;
//# sourceMappingURL=index.js.map