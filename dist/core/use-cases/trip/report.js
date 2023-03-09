"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeReport() {
    const prisma = helpers_1.DbConnection.prisma;
    return ({ tripId, description, } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!tripId)
            throw new errors_1.MissingParamError('tripId');
        if (!description)
            throw new errors_1.MissingParamError('description');
        yield prisma.tripReport.create({ data: { description, trip: { connect: { id: tripId } } } });
        const message = { text: "response.add" };
        return { message };
    });
}
exports.default = makeReport;
//# sourceMappingURL=report.js.map