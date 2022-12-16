"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeAdd({ newsletterDb } = {}) {
    if (!newsletterDb)
        throw new errors_1.ServerError();
    return ({ email, name } = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!email)
            throw new errors_1.MissingParamError('email');
        if (!name)
            throw new errors_1.MissingParamError('name');
        const newsletter = yield newsletterDb.findFirst({ where: { email } });
        if (newsletter)
            throw new errors_1.AlreadyDoneError(newsletter.createdAt);
        yield newsletterDb.insertOne({ data: { email, name } });
        const message = { text: "response.add" };
        return { message };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map