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
                const user = yield userDb.findFirst({ where: { email } });
                if (user)
                    throw new errors_1.AccountAllReadyExistError('email');
                data.email = email;
            }
            console.log(birthDay);
            if (birthDay) {
                const formatedDateArray = birthDay.split('-');
                const fomatedDate = [formatedDateArray[1], formatedDateArray[0], formatedDateArray[2]].join('-');
                data.birthDay = new Date(fomatedDate);
            }
            if (role)
                data.role = role;
            if (language)
                data.language = language;
            if (password)
                data.password = yield hashPassword({ password });
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