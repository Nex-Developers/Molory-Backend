"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeResetPasswordView({ ejsToHtml } = {}) {
    return function resetPasswordView({ firstName, lang }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const salutationText = { text: 'auth.resetPasswordPage.salutation', params: { name: firstName } }, thanks = { text: 'auth.resetPasswordPage.thanks' }, senderName = { text: 'auth.resetPasswordPage.sender' }, message = { text: 'auth.resetPasswordPage.message' };
            return yield ejsToHtml('pages/auth/password-reset.ejs', { salutationText, thanks, message, senderName }, lang);
        });
    };
}
exports.default = makeResetPasswordView;
//# sourceMappingURL=reset-password-view.js.map