"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const environment_1 = require("../../../configs/environment");
const errors_1 = require("../../../utils/errors");
function makeAddUser({ userDb, isValidEmail, hashPassword, generateToken, askToConfirmEmail, saveTmpToken } = {}) {
    if (!userDb || !isValidEmail || !hashPassword || !generateToken || !askToConfirmEmail || !saveTmpToken)
        throw new errors_1.ServerError();
    return function addUser({ lastName, firstName, phoneNumber, email, birthDay, gender, role, language, password } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!lastName)
                throw new errors_1.MissingParamError('lastName');
            if (!firstName)
                throw new errors_1.MissingParamError('firstName');
            if (!phoneNumber)
                throw new errors_1.MissingParamError('phoneNumber');
            if (!email)
                throw new errors_1.MissingParamError('email');
            if (!(yield isValidEmail({ email })))
                throw new errors_1.InvalidParamError('email');
            if (birthDay) {
                const formatedDateArray = birthDay.split('-');
                const fomatedDate = [formatedDateArray[1], formatedDateArray[0], formatedDateArray[2]].join('-');
                birthDay = new Date(fomatedDate);
            }
            if (!role)
                role = 'user';
            if (!language)
                language = environment_1.env.lang.default;
            password = password ? yield hashPassword({ password }) : '';
            const { id } = yield userDb.insertOne({
                data: {
                    lastName,
                    firstName,
                    phoneNumber,
                    email,
                    gender,
                    birthDay,
                    role,
                    language,
                    password
                }
            });
            const token = yield generateToken({ email });
            yield saveTmpToken({ token });
            yield askToConfirmEmail({ email, token, firstName, lastName, lang: language });
            const message = { text: "response.add" };
            return { message, id };
        });
    };
}
exports.default = makeAddUser;
//# sourceMappingURL=add-user.js.map