"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selfConfirmEnd = exports.confirmEnd = exports.confirmStart = exports.askToEnd = exports.askToStart = exports.ratePassenger = exports.rateDriver = exports.confirmPayment = exports.removeTravel = exports.listTravelInfos = exports.listTravels = exports.editTravel = exports.addTravel = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../../../db");
const firebase_1 = require("../../services/firebase");
const notifications_1 = require("../../services/notifications");
const add_1 = (0, tslib_1.__importDefault)(require("./add"));
const confirm_payment_1 = (0, tslib_1.__importDefault)(require("./confirm-payment"));
const edit_1 = (0, tslib_1.__importDefault)(require("./edit"));
const list_item_infos_1 = (0, tslib_1.__importDefault)(require("./list-item-infos"));
const list_items_1 = (0, tslib_1.__importDefault)(require("./list-items"));
const remove_1 = (0, tslib_1.__importDefault)(require("./remove"));
const rate_driver_1 = (0, tslib_1.__importDefault)(require("./rate-driver"));
const rate_passenger_1 = (0, tslib_1.__importDefault)(require("./rate-passenger"));
const ask_to_start_1 = (0, tslib_1.__importDefault)(require("./ask-to-start"));
const ask_to_end_1 = (0, tslib_1.__importDefault)(require("./ask-to-end"));
const confirm_start_1 = (0, tslib_1.__importDefault)(require("./confirm-start"));
const confirm_end_1 = (0, tslib_1.__importDefault)(require("./confirm-end"));
const self_confirm_end_1 = (0, tslib_1.__importDefault)(require("./self-confirm-end"));
const task_1 = require("../../services/task");
const travelDb = new db_1.TravelDb();
const routeDb = new db_1.RouteDb();
const paymentDb = new db_1.PaymentDb();
const addTravel = (0, add_1.default)({ travelDb, routeDb, paymentDb });
exports.addTravel = addTravel;
const editTravel = (0, edit_1.default)({ travelDb });
exports.editTravel = editTravel;
const listTravels = (0, list_items_1.default)({ travelDb });
exports.listTravels = listTravels;
const listTravelInfos = (0, list_item_infos_1.default)({ travelDb });
exports.listTravelInfos = listTravelInfos;
const removeTravel = (0, remove_1.default)({ travelDb, notifyUser: notifications_1.notifyUser, saveTrip: firebase_1.saveTrip, saveTravel: firebase_1.saveTravel });
exports.removeTravel = removeTravel;
const confirmPayment = (0, confirm_payment_1.default)({ addTask: task_1.addTask, saveProfile: firebase_1.saveProfile, notifyUser: notifications_1.notifyUser, saveTravel: firebase_1.saveTravel, saveTrip: firebase_1.saveTrip });
exports.confirmPayment = confirmPayment;
const rateDriver = (0, rate_driver_1.default)({ saveProfile: firebase_1.saveProfile, notifyUser: notifications_1.notifyUser, saveTravel: firebase_1.saveTravel, saveTrip: firebase_1.saveTrip });
exports.rateDriver = rateDriver;
const ratePassenger = (0, rate_passenger_1.default)({ saveProfile: firebase_1.saveProfile, notifyUser: notifications_1.notifyUser, saveTravel: firebase_1.saveTravel, saveTrip: firebase_1.saveTrip });
exports.ratePassenger = ratePassenger;
const askToStart = (0, ask_to_start_1.default)({ notifyUser: notifications_1.notifyUser, saveTravel: firebase_1.saveTravel });
exports.askToStart = askToStart;
const askToEnd = (0, ask_to_end_1.default)({ notifyUser: notifications_1.notifyUser, addTask: task_1.addTask, saveTravel: firebase_1.saveTravel });
exports.askToEnd = askToEnd;
const confirmStart = (0, confirm_start_1.default)({ notifyUser: notifications_1.notifyUser, addTask: task_1.addTask, saveTravel: firebase_1.saveTravel, saveTrip: firebase_1.saveTrip });
exports.confirmStart = confirmStart;
const confirmEnd = (0, confirm_end_1.default)({ notifyUser: notifications_1.notifyUser, addTask: task_1.addTask, saveTravel: firebase_1.saveTravel, saveTrip: firebase_1.saveTrip });
exports.confirmEnd = confirmEnd;
const selfConfirmEnd = (0, self_confirm_end_1.default)({ notifyUser: notifications_1.notifyUser, addTask: task_1.addTask, saveTravel: firebase_1.saveTravel, saveTrip: firebase_1.saveTrip });
exports.selfConfirmEnd = selfConfirmEnd;
//# sourceMappingURL=index.js.map