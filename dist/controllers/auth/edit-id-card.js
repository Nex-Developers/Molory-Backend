"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const errors_1 = require("../../utils/errors");
const helpers_1 = require("../../utils/helpers");
function makeEditIdCardController({ updateIdCard } = {}) {
    if (!updateIdCard)
        throw new errors_1.ServerError();
    return function editIdCardController(request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { id, lastName, firstName } = request.ref, lang = request.lang, date = new Date(), reqLog = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: id,
                lastName,
                firstName,
                model: 'User',
                path: '/api/auth/id-card',
                modelId: id.toString(),
                action: conventions_1.Action.ULPLOAD,
                status: conventions_1.LogStatus.FAILED,
                description: `${lastName}  ${firstName}  ${conventions_1.Action.ULPLOAD} his ID card`
            };
            try {
                const files = request.files;
                const data = yield updateIdCard({ id, files });
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
exports.default = makeEditIdCardController;
//# sourceMappingURL=edit-id-card.js.map