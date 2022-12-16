"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makeDeleteAccountController({ removeAccount }) {
    return function deleteAccountController(request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id, lastName, firstName } = request.ref, lang = request.lang, date = new Date(), reqLog = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: id,
                lastName,
                firstName,
                model: 'User',
                path: '/api/auth/delete-account',
                modelId: id.toString(),
                action: conventions_1.Action.DELETE,
                status: conventions_1.LogStatus.FAILED,
                description: `${lastName}  ${firstName}  ${conventions_1.Action.DELETE} his account`
            };
            try {
                const token = request.token, data = yield removeAccount({ id, token, lang });
                reqLog.status = conventions_1.LogStatus.SUCCEEDED;
                helpers_1.LogManager.save(reqLog);
                return helpers_1.HttpResponse.ok(data, lang);
            }
            catch (err) {
                reqLog.status = conventions_1.LogStatus.SUCCEEDED;
                helpers_1.LogManager.save(reqLog);
                return helpers_1.HttpResponse.error(err, lang)();
            }
        });
    };
}
exports.default = makeDeleteAccountController;
//# sourceMappingURL=delete-account.js.map