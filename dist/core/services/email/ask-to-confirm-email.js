"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const environment_1 = require("../../../configs/environment");
const errors_1 = require("../../../utils/errors");
function makeAskToConfirmEmail({ sendMail, apiUrl, ejsToHtml } = {}) {
    if (!sendMail || !apiUrl || !ejsToHtml)
        throw new errors_1.ServerError();
    return function askToConfirmEmail({ email, otp, firstName, lang } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!email || !otp || !firstName || !lang)
                throw new errors_1.ServerError();
            console.log(otp);
            const salutationText = { text: 'auth.confirmationMail.salutation', params: { name: firstName } }, thanks = { text: 'auth.confirmationMail.thanks' }, senderName = { text: 'auth.confirmationMail.sender' }, message = { text: 'auth.confirmationMail.message' }, html = yield ejsToHtml('mails/email-confirmation.ejs', { baseUrl: environment_1.env.url, otp, message, salutationText, thanks, senderName }, 'fr');
            const subject = "Confirmation mail";
            return yield sendMail(email, subject, html);
        });
    };
}
exports.default = makeAskToConfirmEmail;
//# sourceMappingURL=ask-to-confirm-email.js.map