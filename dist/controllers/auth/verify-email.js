"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makeVerifyEmailController({ checkEmail }) {
    return function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { email } = request.body, lang = request.lang, date = new Date(), reqLog = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: null,
                email,
                model: 'User',
                path: '/api/auth/verify-email',
                modelId: null,
                action: conventions_1.Action.LOGIN,
                status: conventions_1.LogStatus.FAILED,
                description: `${email}  ${conventions_1.Action.LOGIN}`
            };
            try {
                const data = yield checkEmail({ email });
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
exports.default = makeVerifyEmailController;
//# sourceMappingURL=verify-email.js.map