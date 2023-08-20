"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
exports.default = () => {
    const router = express_1.default.Router();
    router.get('/download/:uploads/:path/:name', (req, res) => {
        const link = path_1.default.join(__dirname, '../../../public/uploads/' + req.params['path'] + '/' + req.params['name']);
        const file = fs_1.default.readFileSync(link);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(file);
    });
    return router;
};
//# sourceMappingURL=docs.js.map