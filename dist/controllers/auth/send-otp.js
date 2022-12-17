"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makeSendOtpController({ signInWithPhoneNumber }) {
    return function sendOtpController(request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { phoneNumber, action } = request.body, lang = request.lang, date = new Date(), reqLog = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: null,
                phoneNumber,
                model: 'User',
                path: '/api/auth/send-otp',
                modelId: null,
                action: conventions_1.Action.REQUEST,
                status: conventions_1.LogStatus.FAILED,
                description: `${phoneNumber} ${conventions_1.Action.REQUEST} to receive otp`
            };
            try {
                const data = yield signInWithPhoneNumber({ phoneNumber, action });
                reqLog.status = conventions_1.LogStatus.SUCCEEDED;
                helpers_1.LogManager.save(reqLog);
                return helpers_1.HttpResponse.ok(data, lang);
            }
            catch (err) {
                reqLog.failureReason = err.message;
                helpers_1.LogManager.save(reqLog);
                return helpers_1.HttpResponse.error(err, lang)();
            }
        });
    };
}
exports.default = makeSendOtpController;
//# sourceMappingURL=send-otp.js.map