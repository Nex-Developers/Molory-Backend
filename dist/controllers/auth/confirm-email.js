"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const errors_1 = require("../../utils/errors");
const helpers_1 = require("../../utils/helpers");
function makeConfirmEmailController({ confirmEmail } = {}) {
    if (!confirmEmail)
        throw new errors_1.ServerError();
    return function confirmEmailController(request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { email } = request.ref, lang = request.lang, date = new Date(), reqLog = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: null,
                email,
                model: 'User',
                path: '/api/auth/confirm-email',
                modelId: '',
                action: conventions_1.Action.ACTIVATE,
                status: conventions_1.LogStatus.FAILED,
                description: `${email} ${conventions_1.Action.ACTIVATE} his account`
            };
            try {
                const token = request.token, data = yield confirmEmail({ token, lang });
                reqLog.status = conventions_1.LogStatus.SUCCEEDED;
                helpers_1.LogManager.save(reqLog);
                return helpers_1.HttpResponse.ok(data);
            }
            catch (err) {
                reqLog.failureReason = err.message;
                helpers_1.LogManager.save(reqLog);
                return helpers_1.HttpResponse.error(err, lang)();
            }
        });
    };
}
exports.default = makeConfirmEmailController;
//# sourceMappingURL=confirm-email.js.map