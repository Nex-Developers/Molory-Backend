"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeUpdateProfile({ userDb } = {}) {
    if (!userDb)
        throw new errors_1.ServerError();
    return function updateProfile({ id, firstName, lastName, birthDay, gender, email } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log('birthDay', birthDay);
            const data = {};
            if (!id)
                throw new errors_1.InvalidParamError('token');
            if (firstName)
                data.firstName = firstName;
            if (lastName)
                data.lastName = lastName;
            if (birthDay)
                data.birthDay = new Date(birthDay);
            if (gender)
                data.gender = gender;
            if (email)
                data.email = email;
            yield userDb.updateOne({ where: { id }, data });
            const message = { text: 'auth.message.updateProfile' };
            return { message };
        });
    };
}
exports.default = makeUpdateProfile;
//# sourceMappingURL=update-profile.js.map