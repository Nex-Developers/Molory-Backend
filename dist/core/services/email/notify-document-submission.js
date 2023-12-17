"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const environment_1 = require("../../../configs/environment");
const errors_1 = require("../../../utils/errors");
function makeNotifyDocumentSubmission({ sendMail, ejsToHtml, sendSlackMessage } = {}) {
    if (!sendMail || !ejsToHtml || !sendSlackMessage)
        throw new errors_1.ServerError();
    return function askToConfirmEmail({ name }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const html = yield ejsToHtml('mails/notify-document-submission.ejs', { name, baseUrl: environment_1.env.url, }, 'fr');
            const subject = "Soumission de document";
            sendSlackMessage("L'utilisateur " + name + " a soumis des documents sur la plateforme Molory, veuillez consulter le dashboard d'administration pour les valider.");
            const mails = ["magnimgnamah@gmail.com", "nssoftdev@gmail.com", "robinsonninim@gmail.com", "k0d3.s0n1k@gmail.com"];
            mails.forEach(email => sendMail(email, subject, html));
        });
    };
}
exports.default = makeNotifyDocumentSubmission;
//# sourceMappingURL=notify-document-submission.js.map