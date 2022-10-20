"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const environment_1 = require("../../../configs/environment");
function makeEmailConfirmationView({ ejsToHtml } = {}) {
    return function emailConfirmationView({ firstName, lang }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const salutationText = { text: 'auth.confirmationPage.salutation', params: { name: firstName } }, thanks = { text: 'auth.confirmationPage.thanks' }, senderName = { text: 'auth.confirmationPage.sender' }, message = { text: 'auth.confirmationPage.message' };
            return yield ejsToHtml('pages/auth/email-confirmation.ejs', { salutationText, baseUrl: environment_1.env.url, thanks, message, senderName }, 'fr');
        });
    };
}
exports.default = makeEmailConfirmationView;
//# sourceMappingURL=email-confirmation-view.js.map