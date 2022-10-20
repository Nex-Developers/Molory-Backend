"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makeGetUserLogsController() {
    return function getUserLogsController(request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const lang = request.lang, { id } = request.params, userId = request.ref.id, { lastName, firstName } = request.ref, reqLog = {
                date: new Date().toDateString(),
                time: new Date().toTimeString(),
                userId,
                lastName,
                firstName,
                model: 'Log',
                path: '/api/logs/:id',
                modelId: id,
                action: conventions_1.Action.READ,
                status: conventions_1.LogStatus.FAILED,
                description: `${lastName}  ${firstName}  ${conventions_1.Action.READ} user ${id} logs`
            };
            try {
                const data = yield helpers_1.LogManager.getByUser(Number(id));
                reqLog.status = conventions_1.LogStatus.SUCCEEDED;
                reqLog.description += ` (${data.length}) rows`;
                helpers_1.LogManager.save(reqLog);
                return helpers_1.HttpResponse.ok(data, lang);
            }
            catch (err) {
                const lang = request.lang;
                reqLog.status = conventions_1.LogStatus.FAILED;
                reqLog.failureReason = err.message;
                helpers_1.LogManager.save(reqLog);
                return helpers_1.HttpResponse.error(err, lang)();
            }
        });
    };
}
exports.default = makeGetUserLogsController;
//# sourceMappingURL=get-user-logs.js.map