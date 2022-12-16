"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnswersController = exports.deleteAnswerController = exports.patchAnswerController = exports.postAnswerController = void 0;
const tslib_1 = require("tslib");
const answer_1 = require("../../core/use-cases/answer");
const delete_1 = tslib_1.__importDefault(require("./delete"));
const get_items_1 = tslib_1.__importDefault(require("./get-items"));
const patch_1 = tslib_1.__importDefault(require("./patch"));
const post_1 = tslib_1.__importDefault(require("./post"));
const postAnswerController = (0, post_1.default)({ addAnswer: answer_1.addAnswer });
exports.postAnswerController = postAnswerController;
const patchAnswerController = (0, patch_1.default)({ editAnswer: answer_1.editAnswer });
exports.patchAnswerController = patchAnswerController;
const deleteAnswerController = (0, delete_1.default)({ removeAnswer: answer_1.removeAnswer });
exports.deleteAnswerController = deleteAnswerController;
const getAnswersController = (0, get_items_1.default)({ listAnswers: answer_1.listAnswers });
exports.getAnswersController = getAnswersController;
//# sourceMappingURL=index.js.map