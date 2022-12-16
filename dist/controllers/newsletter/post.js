"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const helpers_1 = require("../../utils/helpers");
function makePostController({ addNewsletter }) {
    return function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { email, name } = request.body, reqLog = {
                date: new Date().toDateString(),
                time: new Date().toTimeString(),
                userId: email,
                lastName: 'Guest',
                firstName: name,
                model: 'Newsletter',
                path: '/api/newsletter',
                modelId: email,
                action: conventions_1.Action.WRITE,
                status: conventions_1.LogStatus.FAILED,
                description: `${name}  susbscribe to newsletter`
            };
            try {
                const lang = request.lang, data = yield addNewsletter({ email, name });
                reqLog.status = conventions_1.LogStatus.SUCCEEDED;
                helpers_1.LogManager.save(reqLog);
                return helpers_1.HttpResponse.ok(data, lang);
            }
            catch (err) {
                reqLog.failureReason = err.message;
                helpers_1.LogManager.save(reqLog);
                const lang = request.lang;
                return helpers_1.HttpResponse.error(err, lang)();
            }
        });
    };
}
exports.default = makePostController;
//# sourceMappingURL=post.js.map