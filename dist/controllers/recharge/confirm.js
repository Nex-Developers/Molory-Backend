"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makePostConfirmController({ confirmRecharge }) {
    return function (request) {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const reqLog = {
                date: new Date().toDateString(),
                time: new Date().toTimeString(),
                userId: ((_a = request === null || request === void 0 ? void 0 : request.params) === null || _a === void 0 ? void 0 : _a.id) || "userId",
                lastName: 'Fedapay',
                firstName: '',
                model: 'Recharge',
                path: '/api/recharge',
                modelId: '',
                action: conventions_1.Action.WRITE,
                status: conventions_1.LogStatus.FAILED,
                description: `Fedapay  ${conventions_1.Action.WRITE} recharge `
            };
            try {
                const lang = request.lang, data = yield confirmRecharge({ body: request.body, token: request.token });
                reqLog.status = conventions_1.LogStatus.SUCCEEDED;
                reqLog.modelId = (data === null || data === void 0 ? void 0 : data.id) || '';
                reqLog.description += data === null || data === void 0 ? void 0 : data.id;
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
//# sourceMappingURL=confirm.js.map