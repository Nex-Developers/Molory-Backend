"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAnswers = exports.removeAnswer = exports.editAnswer = exports.addAnswer = void 0;
const tslib_1 = require("tslib");
const add_1 = (0, tslib_1.__importDefault)(require("./add"));
const edit_1 = (0, tslib_1.__importDefault)(require("./edit"));
const remove_1 = (0, tslib_1.__importDefault)(require("./remove"));
const list_items_1 = (0, tslib_1.__importDefault)(require("./list-items"));
const db_1 = require("../../../db");
const answerDb = new db_1.AnswerDb();
const addAnswer = (0, add_1.default)({ answerDb });
exports.addAnswer = addAnswer;
const editAnswer = (0, edit_1.default)({ answerDb });
exports.editAnswer = editAnswer;
const removeAnswer = (0, remove_1.default)({ answerDb });
exports.removeAnswer = removeAnswer;
const listAnswers = (0, list_items_1.default)({ answerDb });
exports.listAnswers = listAnswers;
//# sourceMappingURL=index.js.map