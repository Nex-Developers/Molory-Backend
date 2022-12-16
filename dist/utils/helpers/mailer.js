"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const environment_1 = require("../../configs/environment");
class Mailer {
    static connect() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            Mailer.transporter = yield nodemailer_1.default.createTransport({
                host: environment_1.env.mail.host,
                port: environment_1.env.mail.port,
                secure: true,
                logger: false,
                debug: false,
                secureConnection: false,
                auth: {
                    user: environment_1.env.mail.email,
                    pass: environment_1.env.mail.password
                },
                tls: {
                    rejectUnAuthorized: true
                }
            });
        });
    }
    static send(to, subject, html) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: environment_1.env.mail.email,
                to,
                subject,
                html
            };
            yield Mailer.transporter.sendMail(mailOptions);
        });
    }
}
exports.default = Mailer;
//# sourceMappingURL=mailer.js.map