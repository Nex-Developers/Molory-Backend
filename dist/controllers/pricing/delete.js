"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makeDeleteController({ removePricing }) {
    return function (request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const reqLog = {
                date: new Date().toDateString(),
                time: new Date().toTimeString(),
                userId: request.ref.id,
                lastName: request.ref.lastName,
                firstName: request.ref.firstName,
                model: 'Pricing',
                path: '/api/pricing',
                modelId: request.ref.id,
                action: conventions_1.Action.DELETE,
                status: conventions_1.LogStatus.FAILED,
                description: `${request.ref.lastName}  ${request.ref.firstName}  ${conventions_1.Action.DELETE} pricing ${request.body.id}`
            };
            try {
                const lang = request.lang, { id } = request.body, data = yield removePricing({ id });
                reqLog.status = conventions_1.LogStatus.SUCCEEDED;
                helpers_1.LogManager.save(reqLog);
                return helpers_1.HttpResponse.ok(data, lang);
            }
            catch (err) {
                const lang = request.lang;
                reqLog.failureReason = err.message;
                helpers_1.LogManager.save(reqLog);
                return helpers_1.HttpResponse.error(err, lang)();
            }
        });
    };
}
exports.default = makeDeleteController;
//# sourceMappingURL=delete.js.map