"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("../../core/conventions");
const errors_1 = require("../../utils/errors");
const helpers_1 = require("../../utils/helpers");
function makePatchUserAvatarController({ editUserAvatar } = {}) {
    if (!editUserAvatar)
        throw new errors_1.ServerError();
    return function patchUserAvatarController(request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const reqLog = {
                date: new Date().toDateString(),
                time: new Date().toTimeString(),
                userId: request.ref.id,
                lastName: request.ref.lastName,
                firstName: request.ref.firstName,
                model: 'User',
                path: '/api/user-avatar',
                modelId: request.body.id.toString(),
                action: conventions_1.Action.ULPLOAD,
                status: conventions_1.LogStatus.FAILED,
                description: `${request.ref.lastName}  ${request.ref.firstName}  ${conventions_1.Action.ULPLOAD} user ${request.body.id} avatar`
            };
            try {
                const { id } = request.body, lang = request.lang, file = request.file, data = yield editUserAvatar({ id: Number(id), file });
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
exports.default = makePatchUserAvatarController;
//# sourceMappingURL=patch-user-avatar.js.map