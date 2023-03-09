"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeReport() {
    return ({ travelId, description, userId } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!travelId)
            throw new errors_1.MissingParamError('travelId');
        if (!description)
            throw new errors_1.MissingParamError('description');
        yield prisma.travelReport.create({ data: { description, user: { connect: { id: userId } }, travel: { connect: { id: travelId } } } });
        const message = { text: "response.add" };
        return { message };
    });
}
exports.default = makeReport;
//# sourceMappingURL=report.js.map