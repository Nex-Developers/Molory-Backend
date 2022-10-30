"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makeVerifyPasswordController({ checkPassword }) {
    return function (request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { id } = request.ref, lang = request.lang, date = new Date(), reqLog = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: id,
                model: 'User',
                path: '/api/auth/verify-password',
                modelId: id,
                action: conventions_1.Action.LOGIN,
                status: conventions_1.LogStatus.FAILED,
                description: `${id}  ${conventions_1.Action.LOGIN}`
            };
            try {
                console.log(request.body);
                const data = yield checkPassword({ id, password: request.body.password, device: request.body.device, token: request.token });
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
exports.default = makeVerifyPasswordController;
//# sourceMappingURL=verify-password.js.map