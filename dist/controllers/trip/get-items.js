"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makeGetItemsController({ listTrips }) {
    return function (request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const reqLog = {
                date: new Date().toDateString(),
                time: new Date().toTimeString(),
                userId: request.ref.id,
                lastName: request.ref.lastName,
                firstName: request.ref.firstName,
                model: 'Trip',
                path: '/api/trip',
                modelId: 'all',
                action: conventions_1.Action.READ,
                status: conventions_1.LogStatus.FAILED,
                description: `${request.ref.lastName}  ${request.ref.firstName}  ${conventions_1.Action.READ} all trips`
            };
            try {
                const lang = request.lang, body = request.params;
                if (request.ref.role === 'driver')
                    body.userId = request.ref.id;
                const data = yield listTrips(Object.assign({}, body));
                reqLog.status = conventions_1.LogStatus.SUCCEEDED;
                reqLog.description += ` (${data.count}) from ${data.startAt} to ${data.startAt + data.limit}`;
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
exports.default = makeGetItemsController;
//# sourceMappingURL=get-items.js.map