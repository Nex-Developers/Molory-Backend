"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makeUnblockUserController({ unblockUser }) {
    return function unblockUserController(request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const reqLog = {
                date: new Date().toDateString(),
                time: new Date().toTimeString(),
                userId: request.ref.id,
                lastName: request.ref.lastName,
                firstName: request.ref.firstName,
                model: 'User',
                path: '/api/user-unblock',
                modelId: request.body.id.toString(),
                action: conventions_1.Action.ACTIVATE,
                status: conventions_1.LogStatus.FAILED,
                description: `${request.ref.lastName}  ${request.ref.firstName}  ${conventions_1.Action.ACTIVATE} user ${request.body.id}`
            };
            try {
                const lang = request.lang, { id } = request.body, data = yield unblockUser({ id });
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
exports.default = makeUnblockUserController;
//# sourceMappingURL=unblock-user.js.map