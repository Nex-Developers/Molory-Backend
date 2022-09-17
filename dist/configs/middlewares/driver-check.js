"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../utils/helpers");
exports.default = (req, res, next) => {
    const ref = req.params.ref;
    if (!ref) {
        const httpResponse = helpers_1.HttpResponse.serverError(req.params.lang);
        res.status(httpResponse.statusCode).send(httpResponse.body);
    }
    else if (ref.role !== 'driver') {
        const httpResponse = helpers_1.HttpResponse.unauthorizedError(req.params.lang);
        res.status(httpResponse.statusCode).send(httpResponse.body);
    }
    else
        next();
};
//# sourceMappingURL=driver-check.js.map