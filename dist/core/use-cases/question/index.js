"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listQuestions = exports.removeQuestion = exports.editQuestion = exports.addQuestion = void 0;
const tslib_1 = require("tslib");
const add_1 = tslib_1.__importDefault(require("./add"));
const edit_1 = tslib_1.__importDefault(require("./edit"));
const remove_1 = tslib_1.__importDefault(require("./remove"));
const list_items_1 = tslib_1.__importDefault(require("./list-items"));
const db_1 = require("../../../db");
const questionDb = new db_1.QuestionDb();
const addQuestion = (0, add_1.default)({ questionDb });
exports.addQuestion = addQuestion;
const editQuestion = (0, edit_1.default)({ questionDb });
exports.editQuestion = editQuestion;
const removeQuestion = (0, remove_1.default)({ questionDb });
exports.removeQuestion = removeQuestion;
const listQuestions = (0, list_items_1.default)({ questionDb });
exports.listQuestions = listQuestions;
//# sourceMappingURL=index.js.map