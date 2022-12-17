"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makeResetPasswordController({ removePassword } = {}) {
    return function resetPasswordController(request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { email } = request.ref, lang = request.lang, date = new Date(), reqLog = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: null,
                email,
                model: 'User',
                path: '/api/auth/reset-password',
                modelId: null,
                action: conventions_1.Action.REQUEST,
                status: conventions_1.LogStatus.FAILED,
                description: `${email}  reset his password`
            };
            try {
                const token = request.token, { otp } = request.body, data = yield removePassword({ token, lang, otp });
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
exports.default = makeResetPasswordController;
//# sourceMappingURL=reset-password.js.map