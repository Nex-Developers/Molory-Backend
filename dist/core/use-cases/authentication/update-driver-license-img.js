"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeUpdateDriverLicenseImg({ userDb, saveProfile, notifyDocumentSubmission } = {}) {
    if (!userDb || !saveProfile || !notifyDocumentSubmission)
        throw new errors_1.ServerError();
    return function ({ id, files } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!files || files.length == 0)
                throw new errors_1.MissingParamError('files');
            console.log('files', files);
            const user = yield userDb.findFirst({ where: { id }, select: { driverLicenseStatus: true, firstName: true, lastName: true } });
            if (!user)
                throw new errors_1.InvalidParamError('token');
            if (user.driverLicenseStatus == 2)
                throw new errors_1.AlreadyDoneError('before');
            const driverLicenseFront = files[0];
            const backFile = files[1];
            let driverLicenseBack = '';
            if (backFile)
                driverLicenseBack = backFile;
            console.log(driverLicenseFront, driverLicenseBack);
            yield userDb.updateOne({ where: { id }, data: { driverLicenseFront, driverLicenseBack, driverLicenseStatus: 2, driverLicenseUploadedAt: new Date() } });
            saveProfile(id);
            notifyDocumentSubmission({ name: user.firstName + " " + user.lastName });
            const message = { text: 'response.update' };
            return { message, data: { driverLicenseFront, driverLicenseBack } };
        });
    };
}
exports.default = makeUpdateDriverLicenseImg;
//# sourceMappingURL=update-driver-license-img.js.map