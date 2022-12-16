"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewslettersController = exports.postNewsletterController = void 0;
const tslib_1 = require("tslib");
const newsletter_1 = require("../../core/use-cases/newsletter");
const get_items_1 = tslib_1.__importDefault(require("./get-items"));
const post_1 = tslib_1.__importDefault(require("./post"));
const postNewsletterController = (0, post_1.default)({ addNewsletter: newsletter_1.addNewsletter });
exports.postNewsletterController = postNewsletterController;
const getNewslettersController = (0, get_items_1.default)({ listNewsletters: newsletter_1.listNewsletters });
exports.getNewslettersController = getNewslettersController;
//# sourceMappingURL=index.js.map