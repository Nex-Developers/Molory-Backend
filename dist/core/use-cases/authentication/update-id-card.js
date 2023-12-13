"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const environment_1 = require("../../../configs/environment");
const errors_1 = require("../../../utils/errors");
function makeUpdateIdCard({ userDb, saveProfile, notifyDocumentSubmission } = {}) {
    if (!userDb || !saveProfile || !notifyDocumentSubmission)
        throw new errors_1.ServerError();
    return function ({ id, files } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!files || files.length == 0)
                throw new errors_1.MissingParamError('files');
            console.log('files', files);
            const user = yield userDb.findFirst({ where: { id }, select: { idCardStatus: true } });
            if (!user)
                throw new errors_1.InvalidParamError('token');
            if (user.idCardStatus == 2)
                throw new errors_1.AlreadyDoneError('before');
            const frontFile = files[0];
            const idCardFront = environment_1.env.url + frontFile.path.substring(frontFile.path.indexOf("/"));
            const backFile = files[1];
            let idCardBack = '';
            if (backFile)
                idCardBack = environment_1.env.url + backFile.path.substring(backFile.path.indexOf("/"));
            yield userDb.updateOne({ where: { id }, data: { idCardBack, idCardFront, idCardStatus: 2, idCardUploadedAt: new Date() } });
            saveProfile(id);
            notifyDocumentSubmission({ name: user.firstName + " " + user.lastName });
            const message = { text: 'response.update' };
            return { message, data: { idCardFront, idCardBack } };
        });
    };
}
exports.default = makeUpdateIdCard;
//# sourceMappingURL=update-id-card.js.map