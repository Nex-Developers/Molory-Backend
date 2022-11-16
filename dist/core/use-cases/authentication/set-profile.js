"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const moment_1 = (0, tslib_1.__importDefault)(require("moment"));
function makeSetProfile({ userDb, } = {}) {
    if (!userDb)
        throw new errors_1.ServerError();
    return function setProfile({ id, lang, firstName, lastName, gender, email, birthDay } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log('birthDay', birthDay);
            if (!id)
                throw new errors_1.InvalidParamError('token');
            if (!firstName)
                throw new errors_1.MissingParamError('firstName');
            if (!lastName)
                throw new errors_1.MissingParamError('lastName');
            if (!gender)
                throw new errors_1.MissingParamError('gender');
            if (!birthDay)
                throw new errors_1.MissingParamError('birthDay');
            const formatedDate = (0, moment_1.default)(birthDay, 'DD-MM-YYYY').format('MM-DD-YYYY');
            birthDay = new Date(formatedDate);
            let user = yield userDb.findFirst({ where: { id }, select: { firstName: true, lastName: true, birthDay: true, profileCompletedAt: true } });
            if (user && (user.firstName || user.lastName || user.birthDay)) {
                const message = { text: 'error.alreadyDone', params: { date: user.profileCompletedAt } };
                return { message };
            }
            const data = { firstName, lastName, gender, birthDay, email, profileCompletedAt: new Date(), language: lang };
            user = yield userDb.updateOne({ where: { id }, data });
            const message = { text: 'auth.message.profileUpdated' };
            return { message, user };
        });
    };
}
exports.default = makeSetProfile;
//# sourceMappingURL=set-profile.js.map