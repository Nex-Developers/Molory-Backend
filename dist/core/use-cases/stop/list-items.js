"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItemInfos({ routeDb } = {}) {
    if (!routeDb)
        throw new errors_1.ServerError();
    return ({ tripId } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!tripId)
            throw new errors_1.MissingParamError('id');
        const routes = yield routeDb.findFirst({
            where: {
                tripId: true
            },
            select: {
                departure: true,
                arrival: true
            }
        });
        const data = [];
        routes.forEach(route => {
            data.push(route.departure);
            data.push(route.arrival);
        });
        return { data };
    });
}
exports.default = makeListItemInfos;
//# sourceMappingURL=list-items.js.map