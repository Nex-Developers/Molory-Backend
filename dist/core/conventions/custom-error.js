"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(name, message, params) {
        super(message);
        this.name = name,
            this.params = params;
    }
}
exports.default = CustomError;
//# sourceMappingURL=custom-error.js.map