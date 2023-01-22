"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makePostConfirmController({ confirmRefund }) {
    return function (request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const reqLog = {
                date: new Date().toDateString(),
                time: new Date().toTimeString(),
                userId: 0,
                lastName: 'Cinetpay',
                firstName: '',
                model: 'Refund',
                path: '/api/refund',
                modelId: '',
                action: conventions_1.Action.WRITE,
                status: conventions_1.LogStatus.FAILED,
                description: `Cinetpay validate refund`
            };
            try {
                const lang = request.lang, body = request.body, data = yield confirmRefund(Object.assign({}, body));
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
exports.default = makePostConfirmController;
//# sourceMappingURL=post-confirm.js.map