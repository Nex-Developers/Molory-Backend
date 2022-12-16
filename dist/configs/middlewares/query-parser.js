"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const helpers_1 = require("../../utils/helpers");
exports.default = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    req.params = req.query;
    const token = req.params.token;
    if (token) {
        const ref = yield helpers_1.TokenManager.verify(token);
        if (!ref)
            res.status(403).send({ message: 'Access denied' });
        else {
            const tokenIndex = yield helpers_1.CacheManager.findInArray('tmp_tokens', token);
            if (tokenIndex === undefined || tokenIndex === null)
                res.status(503).json({ error: "Token expired." });
            else {
                req.params.ref = ref;
                req.params.token = token;
                next();
            }
        }
    }
    else {
        next();
    }
});
//# sourceMappingURL=query-parser.js.map