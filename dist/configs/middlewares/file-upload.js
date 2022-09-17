"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const multer_1 = (0, tslib_1.__importDefault)(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/' + file.fieldname);
    },
    filename: function (req, file, cb) {
        const extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        if (extension === 'octet-stream')
            extension = file.originalname.split('.')[1];
        cb(null, Date.now().toString() + '.' + extension);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
//# sourceMappingURL=file-upload.js.map