"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyDoneError = void 0;
const conventions_1 = require("../../core/conventions");
class AlreadyDoneError extends conventions_1.CustomError {
    constructor(date) {
        super('AlreadyDoneError', 'error.alreadyDone', { date: date });
    }
}
exports.AlreadyDoneError = AlreadyDoneError;
//# sourceMappingURL=already-done-error.js.map