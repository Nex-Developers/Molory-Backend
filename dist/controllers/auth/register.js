"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makeRegisterController({ signUp }) {
    return function registerController(request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { lastName, firstName, email, phoneNumber, gender, birthDay } = request.body, lang = request.lang, date = new Date(), reqLog = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: null,
                lastName,
                firstName,
                email,
                phoneNumber,
                model: 'User',
                path: '/api/auth/register',
                modelId: null,
                action: conventions_1.Action.WRITE,
                status: conventions_1.LogStatus.FAILED,
                description: `${lastName}  ${firstName}  ${conventions_1.Action.WRITE} his infos`
            };
            try {
                const body = request.body, data = yield signUp({
                    firstName,
                    lastName,
                    birthDay,
                    phoneNumber,
                    email,
                    gender,
                    password: body.password,
                    language: lang
                });
                reqLog.status = conventions_1.LogStatus.SUCCEEDED;
                helpers_1.LogManager.save(reqLog);
                return helpers_1.HttpResponse.ok(data, lang);
            }
            catch (err) {
                reqLog.failureReason = err.message;
                helpers_1.LogManager.save(reqLog);
                return helpers_1.HttpResponse.error(err, lang)();
            }
        });
    };
}
exports.default = makeRegisterController;
//# sourceMappingURL=register.js.map