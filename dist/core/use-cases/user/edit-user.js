"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeEditUser({ userDb, isValidEmail, hashPassword } = {}) {
    if (!userDb || !isValidEmail || !hashPassword)
        throw new errors_1.ServerError();
    return function editUser({ id, lastName, firstName, phoneNumber, gender, email, birthDay, role, language, password } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!id)
                throw new errors_1.MissingParamError('id');
            const data = {};
            if (lastName)
                data.lastName = lastName;
            if (firstName)
                data.firstName = firstName;
            if (phoneNumber)
                data.phoneNumber = phoneNumber;
            if (gender)
                data.gender = gender;
            if (email) {
                if (!(yield isValidEmail({ email })))
                    throw new errors_1.InvalidParamError('email');
                data.email = email;
            }
            if (birthDay) {
                if (typeof birthDay === 'string')
                    birthDay = new Date(birthDay);
                data.birthDay = birthDay;
            }
            if (role)
                data.role = role;
            if (language)
                data.language = language;
            if (password)
                password = yield hashPassword({ password });
            if (Object.keys(data).length === 0)
                throw new errors_1.MissingParamError('all');
            yield userDb.updateOne({ where: { id }, data });
            const message = { text: "response.edit" };
            return { message };
        });
    };
}
exports.default = makeEditUser;
//# sourceMappingURL=edit-user.js.map