"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makeGetConfirmController({ validatePayment }) {
    return function (request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const reqLog = {
                date: new Date().toDateString(),
                time: new Date().toTimeString(),
                userId: request.params.id,
                lastName: 'Fedapay',
                firstName: '',
                model: 'Payment',
                path: '/api/payment',
                modelId: '',
                action: conventions_1.Action.WRITE,
                status: conventions_1.LogStatus.FAILED,
                description: `Fedapay  ${conventions_1.Action.WRITE} payment `
            };
            try {
                const lang = request.lang, data = yield validatePayment({ body: request.body, token: request.token });
                reqLog.status = conventions_1.LogStatus.SUCCEEDED;
                reqLog.modelId = data.id || '';
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
exports.default = makeGetConfirmController;
//# sourceMappingURL=get-confirm.js.map