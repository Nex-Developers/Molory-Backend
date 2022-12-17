"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const db_1 = require("../../db");
const errors_1 = require("../../utils/errors");
const helpers_1 = require("../../utils/helpers");
exports.default = (req, res, next) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let httpResponse;
    if (!token) {
        httpResponse = helpers_1.HttpResponse.badRequest(new errors_1.MissingParamError('token'), req.params.lang);
        res.status(httpResponse.statusCode).json(httpResponse.body);
    }
    else {
        try {
            const ref = yield helpers_1.TokenManager.verify(token);
            if (!ref) {
                httpResponse = helpers_1.HttpResponse.badRequest(new errors_1.InvalidParamError('token'), req.params.lang);
                res.status(httpResponse.statusCode).json(httpResponse.body);
            }
            else {
                const tokenIndex = yield helpers_1.CacheManager.findInArray('tokens', token);
                if (tokenIndex === undefined || tokenIndex === null) {
                    httpResponse = helpers_1.HttpResponse.forbiddenError(new errors_1.ExpiredParamError('token'), req.params.lang);
                    res.status(200).json(httpResponse.body);
                }
                else {
                    req.params.ref = ref;
                    req.params.token = token;
                    const userDb = new db_1.UserDb();
                    const { lastName, firstName, role, blockedAt } = yield userDb.findFirst({ where: { id: ref.id }, select: { lastName: true, firstName: true, role: true, blockedAt: true } });
                    ref.role = role;
                    req.params.ref.lastName = lastName;
                    req.params.ref.firstName = firstName;
                    if (blockedAt) {
                        httpResponse = helpers_1.HttpResponse.unauthorizedError(req.params.lang);
                        res.status(200).json(httpResponse.body);
                    }
                    else
                        next();
                }
            }
        }
        catch (err) {
            httpResponse = helpers_1.HttpResponse.badRequest(new errors_1.InvalidParamError('token'), req.params.lang);
            res.status(httpResponse.statusCode).json(httpResponse.body);
        }
    }
});
//# sourceMappingURL=auth-check.js.map