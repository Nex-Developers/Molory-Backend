"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeExpressRouterAdapter() {
    return function expressRouterAdapter(controller, responseFormat, download) {
        return (req, res) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log(req);
            const httpRequest = {
                body: req.body,
                params: req.params,
                token: req.params.token,
                ref: req.params.ref,
                lang: req.params.lang,
                file: req.file,
                files: req.files
            };
            const httpResponse = yield controller(httpRequest);
            if (download) {
                res.type(responseFormat);
                res.status(httpResponse.statusCode).download(httpResponse.body.data);
            }
            else if (responseFormat === 'html') {
                res.type(responseFormat);
                res.status(httpResponse.statusCode).send(httpResponse.body.view);
            }
            else if (responseFormat === 'render') {
                res.type('html');
                res.render(httpResponse.body.view);
            }
            else if (responseFormat) {
                res.type(responseFormat);
                res.status(httpResponse.statusCode).send(httpResponse.body);
            }
            else {
                res.json(httpResponse.body);
            }
        });
    };
}
exports.default = makeExpressRouterAdapter;
//# sourceMappingURL=express-router-adapter.js.map