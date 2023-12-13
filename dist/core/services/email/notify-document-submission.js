"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeNotifyDocumentSubmission({ sendMail, ejsToHtml } = {}) {
    if (!sendMail || !ejsToHtml)
        throw new errors_1.ServerError();
    return function askToConfirmEmail({ name }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const html = yield ejsToHtml('mails/notify-document-submission.ejs', { name }, 'fr');
            const subject = "Soumission de document";
            const mails = ["magnimgnamah@gmail.com", "nssoftdev@gmail.com", "robinsonninim@gmail.com", "k0d3.s0n1k@gmail.com"];
            mails.forEach(email => sendMail(email, subject, html));
        });
    };
}
exports.default = makeNotifyDocumentSubmission;
//# sourceMappingURL=notify-document-submission.js.map