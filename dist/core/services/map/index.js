"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculMatrix = void 0;
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
const calcul_matrix_1 = (0, tslib_1.__importDefault)(require("./calcul-matrix"));
const calculMatrix = (0, calcul_matrix_1.default)({ gmapCalculDistance: helpers_1.GoogleMap.calculMatrix });
exports.calculMatrix = calculMatrix;
//# sourceMappingURL=index.js.map