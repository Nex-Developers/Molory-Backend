"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makePostValidateLicenseController({ validateDriverLicense }) {
    return function (request) {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const reqLog = {
                date: new Date().toDateString(),
                time: new Date().toTimeString(),
                userId: request.ref.id,
                lastName: request.ref.lastName,
                firstName: request.ref.firstName,
                model: 'User',
                path: '/api/validate-driver-license',
                modelId: (_a = request.body.userId) === null || _a === void 0 ? void 0 : _a.toString(),
                action: conventions_1.Action.EDIT,
                status: conventions_1.LogStatus.FAILED,
                description: `${request.ref.lastName}  ${request.ref.firstName}  ${conventions_1.Action.EDIT} user ${request.body.userId}`
            };
            try {
                const lang = request.lang, body = request.body, data = yield validateDriverLicense(Object.assign({}, body));
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
exports.default = makePostValidateLicenseController;
//# sourceMappingURL=post-validate-driver-license.js.map