"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = (0, tslib_1.__importDefault)(require("moment"));
const environment_1 = require("../../../configs/environment");
const errors_1 = require("../../../utils/errors");
function makeAddUser({ userDb, isValidEmail, hashPassword, generateToken, askToConfirmEmail, saveTmpToken } = {}) {
    if (!userDb || !isValidEmail || !hashPassword || !generateToken || !askToConfirmEmail || !saveTmpToken)
        throw new errors_1.ServerError();
    return function addUser({ lastName, firstName, phoneNumber, email, birthDay, gender, role, language, password } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
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
                const formatedDate = (0, moment_1.default)(birthDay, 'DD-MM-YYYY').format('MM-DD-YYYY');
                birthDay = new Date(formatedDate);
            }
            if (!role)
                role = 'user';
            if (!language)
                language = environment_1.env.lang.default;
            password = password ? yield hashPassword({ password }) : '';
            const { id } = yield userDb.insertOne({ data: {
                    lastName,
                    firstName,
                    phoneNumber,
                    email,
                    gender,
                    birthDay,
                    role,
                    language,
                    password
                } });
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