"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyDocumentSubmission = exports.isValidEmail = exports.resetPasswordView = exports.askToResetPassword = exports.emailConfirmationView = exports.askToConfirmEmail = void 0;
const tslib_1 = require("tslib");
const environment_1 = require("../../../configs/environment");
const helpers_1 = require("../../../utils/helpers");
const ask_to_confirm_email_1 = (0, tslib_1.__importDefault)(require("./ask-to-confirm-email"));
const ask_to_reset_password_1 = (0, tslib_1.__importDefault)(require("./ask-to-reset-password"));
const email_confirmation_view_1 = (0, tslib_1.__importDefault)(require("./email-confirmation-view"));
const is_valid_email_1 = (0, tslib_1.__importDefault)(require("./is-valid-email"));
const notify_document_submission_1 = (0, tslib_1.__importDefault)(require("./notify-document-submission"));
const reset_password_view_1 = (0, tslib_1.__importDefault)(require("./reset-password-view"));
const apiUrl = environment_1.env.url;
const askToConfirmEmail = (0, ask_to_confirm_email_1.default)({ sendMail: helpers_1.Mailer.send, apiUrl, ejsToHtml: helpers_1.DataFormatter.ejsToHtml });
exports.askToConfirmEmail = askToConfirmEmail;
const askToResetPassword = (0, ask_to_reset_password_1.default)({ sendMail: helpers_1.Mailer.send, apiUrl, ejsToHtml: helpers_1.DataFormatter.ejsToHtml });
exports.askToResetPassword = askToResetPassword;
const emailConfirmationView = (0, email_confirmation_view_1.default)({ ejsToHtml: helpers_1.DataFormatter.ejsToHtml });
exports.emailConfirmationView = emailConfirmationView;
const resetPasswordView = (0, reset_password_view_1.default)({ ejsToHtml: helpers_1.DataFormatter.ejsToHtml });
exports.resetPasswordView = resetPasswordView;
const isValidEmail = (0, is_valid_email_1.default)({ emailValidator: helpers_1.ParamValidator.isEmail });
exports.isValidEmail = isValidEmail;
const notifyDocumentSubmission = (0, notify_document_submission_1.default)({
    sendMail: helpers_1.Mailer.send,
    ejsToHtml: helpers_1.DataFormatter.ejsToHtml,
    sendSlackMessage: helpers_1.SlackMessaging.sendMessage
});
exports.notifyDocumentSubmission = notifyDocumentSubmission;
//# sourceMappingURL=index.js.map