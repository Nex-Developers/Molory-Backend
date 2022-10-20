"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const environment_1 = require("../../configs/environment");
const errors_1 = require("../errors");
class HttpResponse {
    static ok(body, lang) {
        if (lang && body.message)
            body.message = _1.LanguageManager.translate(lang, body.message.text, body.message.params);
        if (lang && body.error)
            body.error = _1.LanguageManager.translate(lang, body.error.text, body.error.params);
        return {
            statusCode: 200,
            body
        };
    }
    static error(err, lang) {
        console.warn(err.message);
        const _this = HttpResponse;
        let method;
        if (!lang)
            lang = environment_1.env.lang.default;
        switch (err.name) {
            case 'InvalidParamError':
                method = () => _this.badRequest(err, lang);
                break;
            case 'MissingParamError':
                method = () => _this.badRequest(err, lang);
                break;
            case 'AlreadyDoneError':
                method = () => _this.badRequest(err, lang);
                break;
            case 'NotVerifiedCredentialError':
                method = () => _this.badRequest(err, lang);
                break;
            case 'AccountNotFoundError':
                method = () => _this.badRequest(err, lang);
                break;
            case 'ServerError':
                method = () => _this.serverError(lang);
                break;
            case 'UnauthorizedError':
                method = () => _this.unauthorizedError(lang);
                break;
            case 'ExpiredParamError':
                method = () => _this.forbiddenError(err, lang);
                break;
            default:
                method = () => _this.serverError(lang);
        }
        return method;
    }
    static badRequest(err, lang) {
        return {
            statusCode: 400,
            body: { error: _1.LanguageManager.translate(lang, err.message, err.params) }
        };
    }
    static unauthorizedError(lang) {
        return {
            statusCode: 401,
            body: {
                error: _1.LanguageManager.translate(lang, new errors_1.UnauthorizedError().message)
            }
        };
    }
    static forbiddenError(err, lang) {
        return {
            statusCode: 403,
            body: {
                error: _1.LanguageManager.translate(lang, err.message, err.params)
            }
        };
    }
    static serverError(lang) {
        return {
            statusCode: 500,
            body: {
                error: _1.LanguageManager.translate(lang, new errors_1.ServerError().message)
            }
        };
    }
}
exports.default = HttpResponse;
//# sourceMappingURL=http-response.js.map