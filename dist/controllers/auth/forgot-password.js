"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const errors_1 = require("../../utils/errors");
const helpers_1 = require("../../utils/helpers");
function makeForgotPasswordController({ recoverPassword } = {}) {
    if (!recoverPassword)
        throw new errors_1.ServerError();
    return function forgotPasswordController(request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { email } = request.body, lang = request.lang, date = new Date(), reqLog = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: null,
                email,
                model: 'User',
                path: '/api/auth/forgot-password',
                modelId: null,
                action: conventions_1.Action.REQUEST,
                status: conventions_1.LogStatus.FAILED,
                description: `${email}  forget his password`
            };
            try {
                const data = yield recoverPassword({ email, lang });
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
exports.default = makeForgotPasswordController;
//# sourceMappingURL=forgot-password.js.map