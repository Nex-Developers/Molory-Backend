"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const environment_1 = require("../../../configs/environment");
function makeGetPaymentState({ postData } = {}) {
    return ({ id }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield postData(environment_1.env.cinetPay.checkPaymentUrl, {
            transaction_id: id,
            site_id: environment_1.env.cinetPay.siteId,
            apikey: environment_1.env.cinetPay.apiKey
        });
    });
}
exports.default = makeGetPaymentState;
//# sourceMappingURL=get-payment-state.js.map