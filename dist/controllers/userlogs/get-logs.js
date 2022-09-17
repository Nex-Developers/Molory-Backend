"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makeGetLogsController() {
    return function getLogsController(request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { id, lastName, firstName } = request.ref, lang = request.lang, reqLog = {
                date: new Date().toDateString(),
                time: new Date().toTimeString(),
                userId: id,
                lastName,
                firstName,
                model: 'Log',
                path: '/api/logs',
                modelId: 'all',
                action: conventions_1.Action.READ,
                status: conventions_1.LogStatus.FAILED,
                description: `${lastName}  ${firstName}  ${conventions_1.Action.READ} all logs`
            };
            try {
                const data = yield helpers_1.LogManager.read(request.body.limit, request.body.where);
                reqLog.status = conventions_1.LogStatus.SUCCEEDED;
                reqLog.description += ` (${data.length}) rows`;
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
exports.default = makeGetLogsController;
//# sourceMappingURL=get-logs.js.map