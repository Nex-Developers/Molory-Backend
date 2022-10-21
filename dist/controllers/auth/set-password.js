"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makeSetPasswordController({ setPassword }) {
    return function setPasswordController(request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { email } = request.ref, lang = request.lang, date = new Date(), reqLog = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: null,
                email,
                model: 'User',
                path: '/api/auth/set-password',
                modelId: null,
                action: conventions_1.Action.REQUEST,
                status: conventions_1.LogStatus.FAILED,
                description: `${email} ${conventions_1.Action.REQUEST} to set password`
            };
            try {
                const token = request.token, { otp, password, device } = request.body, data = yield setPassword({ token, otp, password, device, lang, email });
                reqLog.userId = data.data.id;
                reqLog.modelId = data.data.id.toString();
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
exports.default = makeSetPasswordController;
//# sourceMappingURL=set-password.js.map