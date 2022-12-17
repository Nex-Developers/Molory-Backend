"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makeNewEmailController({ changeEmail }) {
    return function newEmailController(request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { id, lastName, firstName } = request.ref, { email } = request.body, lang = request.lang, date = new Date(), reqLog = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: id,
                lastName,
                firstName,
                model: 'User',
                path: '/api/auth/new-email',
                modelId: id.toString(),
                action: conventions_1.Action.EDIT,
                status: conventions_1.LogStatus.FAILED,
                description: `${lastName}  ${firstName}  ${conventions_1.Action.EDIT} his account email`
            };
            try {
                const token = request.token, data = yield changeEmail({ id, email, token, lang });
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
exports.default = makeNewEmailController;
//# sourceMappingURL=new-email.js.map