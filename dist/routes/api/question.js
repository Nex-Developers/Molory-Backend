"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const question_1 = require("../../controllers/question");
exports.default = () => {
    const router = express_1.default.Router();
    router.route('/question')
        .get(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(question_1.getQuestionsController))
        .post(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(question_1.postQuestionController))
        .patch(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(question_1.patchQuestionController))
        .delete(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(question_1.deleteQuestionController));
    return router;
};
//# sourceMappingURL=question.js.map