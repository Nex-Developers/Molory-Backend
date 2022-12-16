"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makeLogoutController({ signOut }) {
    return function logoutController(request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id, lastName, firstName } = request.ref, lang = request.lang, date = new Date(), reqLog = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: id,
                lastName: lastName,
                firstName: firstName,
                model: 'User',
                path: '/api/auth/logout',
                modelId: id.toString(),
                action: conventions_1.Action.LOGOUT,
                status: conventions_1.LogStatus.FAILED,
                description: `${lastName}  ${firstName}  ${conventions_1.Action.LOGOUT} `
            };
            try {
                const token = request.token, data = yield signOut({ token });
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
exports.default = makeLogoutController;
//# sourceMappingURL=logout.js.map