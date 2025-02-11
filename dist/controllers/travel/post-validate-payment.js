"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makePostValidatePaymentController({ confirmPayment }) {
    return function (request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const reqLog = {
                date: new Date().toDateString(),
                time: new Date().toTimeString(),
                userId: request.ref.id,
                lastName: 'External',
                firstName: 'CinetPay',
                model: 'Payment',
                path: '/api/travel',
                modelId: '',
                action: conventions_1.Action.WRITE,
                status: conventions_1.LogStatus.FAILED,
                description: `Cinet pay  ${conventions_1.Action.ACTIVATE} payment`
            };
            try {
                const lang = request.lang, body = request.body;
                const { entity, name } = body;
                console.log(name);
                const data = yield confirmPayment({
                    id: entity.id,
                    ref: entity.ref,
                    receivedAmount: entity.amount,
                    status: (entity.status === 'canceled' || entity.status === 'declined') ? 0 : entity.status === 'approved' ? 1 : -1,
                    validatedAt: new Date()
                });
                reqLog.status = conventions_1.LogStatus.SUCCEEDED;
                reqLog.modelId = data.id;
                reqLog.description += data.id;
                helpers_1.LogManager.save(reqLog);
                return helpers_1.HttpResponse.ok(data, lang);
            }
            catch (err) {
                reqLog.failureReason = err.message;
                helpers_1.LogManager.save(reqLog);
                const lang = request.lang;
                return helpers_1.HttpResponse.error(err, lang)();
            }
        });
    };
}
exports.default = makePostValidatePaymentController;
//# sourceMappingURL=post-validate-payment.js.map