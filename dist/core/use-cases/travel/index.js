"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPayment = exports.removeTravel = exports.listTravelInfos = exports.listTravels = exports.editTravel = exports.addTravel = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const db_1 = require("../../../db");
const payment_1 = require("../../services/payment");
const add_1 = (0, tslib_1.__importDefault)(require("./add"));
const confirm_payment_1 = (0, tslib_1.__importDefault)(require("./confirm-payment"));
const edit_1 = (0, tslib_1.__importDefault)(require("./edit"));
const list_item_infos_1 = (0, tslib_1.__importDefault)(require("./list-item-infos"));
const list_items_1 = (0, tslib_1.__importDefault)(require("./list-items"));
const remove_1 = (0, tslib_1.__importDefault)(require("./remove"));
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
const removeTravel = (0, remove_1.default)({ travelDb });
exports.removeTravel = removeTravel;
const confirmPayment = (0, confirm_payment_1.default)({ getPaymentState: payment_1.getPaymentState, prisma: client_1.prisma });
exports.confirmPayment = confirmPayment;
//# sourceMappingURL=index.js.map