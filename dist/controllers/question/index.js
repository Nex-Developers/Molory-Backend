"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionsController = exports.deleteQuestionController = exports.patchQuestionController = exports.postQuestionController = void 0;
const tslib_1 = require("tslib");
const question_1 = require("../../core/use-cases/question");
const delete_1 = (0, tslib_1.__importDefault)(require("./delete"));
const get_items_1 = (0, tslib_1.__importDefault)(require("./get-items"));
const patch_1 = (0, tslib_1.__importDefault)(require("./patch"));
const post_1 = (0, tslib_1.__importDefault)(require("./post"));
const postQuestionController = (0, post_1.default)({ addQuestion: question_1.addQuestion });
exports.postQuestionController = postQuestionController;
const patchQuestionController = (0, patch_1.default)({ editQuestion: question_1.editQuestion });
exports.patchQuestionController = patchQuestionController;
const deleteQuestionController = (0, delete_1.default)({ removeQuestion: question_1.removeQuestion });
exports.deleteQuestionController = deleteQuestionController;
const getQuestionsController = (0, get_items_1.default)({ listQuestions: question_1.listQuestions });
exports.getQuestionsController = getQuestionsController;
//# sourceMappingURL=index.js.map