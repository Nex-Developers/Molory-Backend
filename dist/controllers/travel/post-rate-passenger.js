"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makePostRatePassengerController({ ratePassenger }) {
    return function (request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const reqLog = {
                date: new Date().toDateString(),
                time: new Date().toTimeString(),
                userId: request.ref.id,
                lastName: request.ref.lastName,
                firstName: request.ref.firstName,
                model: 'Travel',
                path: '/api/rate-passenger',
                modelId: '',
                action: conventions_1.Action.WRITE,
                status: conventions_1.LogStatus.FAILED,
                description: `${request.ref.lastName}  ${request.ref.firstName}  ${conventions_1.Action.WRITE} passenger rating`
            };
            try {
                const lang = request.lang, body = request.body, data = yield ratePassenger(Object.assign(Object.assign({}, body), { by: request.ref.firstName }));
                reqLog.status = conventions_1.LogStatus.SUCCEEDED;
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
exports.default = makePostRatePassengerController;
//# sourceMappingURL=post-rate-passenger.js.map