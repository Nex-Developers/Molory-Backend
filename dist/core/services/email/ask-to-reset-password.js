"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeAskToResetPassword({ sendMail, apiUrl, ejsToHtml } = {}) {
    if (!sendMail || !apiUrl || !ejsToHtml)
        throw new errors_1.ServerError();
    return function askToResetPassword({ email, token, firstName, lang } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!email || !token || !firstName || !lang)
                throw new errors_1.ServerError();
            const salutationText = { text: 'auth.resetPassword.salutation', params: { name: firstName } }, thanks = { text: 'auth.resetPassword.thanks' }, senderName = { text: 'auth.resetPassword.sender' }, message = { text: 'auth.resetPassword.message' }, confirmButtonText = { text: 'auth.resetPassword.button' }, responseUrl = apiUrl + 'api/auth/reset-password?token=' + token + '&lang=' + lang, html = yield ejsToHtml('mails/password-reset.ejs', { responseUrl, message, confirmButtonText, salutationText, thanks, senderName }, lang);
            const subject = "Reset password";
            return yield sendMail(email, subject, html);
        });
    };
}
exports.default = makeAskToResetPassword;
//# sourceMappingURL=ask-to-reset-password.js.map