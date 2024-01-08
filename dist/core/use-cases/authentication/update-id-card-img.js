"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeUpdateIdCardImg({ userDb, saveProfile, notifyDocumentSubmission } = {}) {
    if (!userDb || !saveProfile || !notifyDocumentSubmission)
        throw new errors_1.ServerError();
    return function ({ id, files } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!files || files.length == 0)
                throw new errors_1.MissingParamError('files');
            console.log('files', files);
            const user = yield userDb.findFirst({ where: { id }, select: { idCardStatus: true, firstName: true, lastName: true } });
            if (!user)
                throw new errors_1.InvalidParamError('token');
            if (user.idCardStatus == 2)
                throw new errors_1.AlreadyDoneError('before');
            const idCardFront = files[0];
            const backFile = files[1];
            let idCardBack = '';
            if (backFile)
                idCardBack = backFile;
            yield userDb.updateOne({ where: { id }, data: { idCardBack, idCardFront, idCardStatus: 2, idCardUploadedAt: new Date() } });
            saveProfile(id);
            notifyDocumentSubmission({ name: user.firstName + " " + user.lastName });
            const message = { text: 'response.update' };
            return { message, data: { idCardFront, idCardBack } };
        });
    };
}
exports.default = makeUpdateIdCardImg;
//# sourceMappingURL=update-id-card-img.js.map