"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../utils/errors");
const helpers_1 = require("../../utils/helpers");
exports.default = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let httpResponse;
    if (!token) {
        httpResponse = helpers_1.HttpResponse.badRequest(new errors_1.MissingParamError('token'), req.params.lang);
        res.status(httpResponse.statusCode).json(httpResponse.body);
    }
    else if (token !== '99cf7b60-d869-4e67-9203-3f0c780502db') {
        const httpResponse = helpers_1.HttpResponse.unauthorizedError(req.params.lang);
        res.status(200).json(httpResponse.body);
    }
    else {
        const ref = {
            id: 1,
            firstName: 'Microservice',
            lastName: 'TaskManager',
            role: 'microservice'
        };
        req.params.ref = ref;
        next();
    }
};
//# sourceMappingURL=api-check.js.map