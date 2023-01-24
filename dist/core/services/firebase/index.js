"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveTrip = exports.saveTravel = exports.saveProfile = exports.saveNotification = void 0;
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
const save_notification_1 = (0, tslib_1.__importDefault)(require("./save-notification"));
const save_profile_1 = (0, tslib_1.__importDefault)(require("./save-profile"));
const save_travel_1 = (0, tslib_1.__importDefault)(require("./save-travel"));
const save_trip_1 = (0, tslib_1.__importDefault)(require("./save-trip"));
const saveNotification = (0, save_notification_1.default)({ addInCollection: helpers_1.FirestoreDb.addInCollection });
exports.saveNotification = saveNotification;
const saveProfile = (0, save_profile_1.default)({ set: helpers_1.FirestoreDb.set });
exports.saveProfile = saveProfile;
const saveTravel = (0, save_travel_1.default)({ setInCollection: helpers_1.FirestoreDb.setInCollection });
exports.saveTravel = saveTravel;
const saveTrip = (0, save_trip_1.default)({ setInCollection: helpers_1.FirestoreDb.setInCollection });
exports.saveTrip = saveTrip;
//# sourceMappingURL=index.js.map