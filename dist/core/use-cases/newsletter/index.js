"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listNewsletters = exports.addNewsletter = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../../../db");
const add_1 = (0, tslib_1.__importDefault)(require("./add"));
const list_1 = (0, tslib_1.__importDefault)(require("./list"));
const newsletterDb = new db_1.NewsletterDb();
const addNewsletter = (0, add_1.default)({ newsletterDb });
exports.addNewsletter = addNewsletter;
const listNewsletters = (0, list_1.default)({ newsletterDb });
exports.listNewsletters = listNewsletters;
//# sourceMappingURL=index.js.map