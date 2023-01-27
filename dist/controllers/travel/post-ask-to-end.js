"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makePostAskToEndController({ askToEnd }) {
    return function (request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const reqLog = {
                date: new Date().toDateString(),
                time: new Date().toTimeString(),
                userId: 0,
                lastName: 'Task',
                firstName: 'Manager',
                model: 'Travel',
                path: '/api/ask-to-end-travel',
                modelId: '',
                action: conventions_1.Action.WRITE,
                status: conventions_1.LogStatus.FAILED,
                description: `Task manager ask user to stop trip`
            };
            try {
                const lang = request.lang, body = request.body, data = yield askToEnd(Object.assign({}, body));
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
exports.default = makePostAskToEndController;
//# sourceMappingURL=post-ask-to-end.js.map