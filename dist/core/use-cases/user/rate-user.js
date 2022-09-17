"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeRateUser({ reviewDb, userDb }) {
    if (!reviewDb || !userDb)
        throw new errors_1.ServerError();
    return ({ userId, doneBy, rating, review }) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (rating < 0 || rating > 5)
            throw new errors_1.InvalidParamError('rating');
        yield reviewDb.insertOne({ data: { userId, rating, review, doneBy } });
        const ratings = yield reviewDb.findMany({ where: { userId }, select: { rating } });
        const formatedRatings = ratings.map(rating => rating.value).filter(item => item !== undefined || item !== null);
        const average = formatedRatings.reduce((a, b) => a + b) / formatedRatings.length;
        const fixedAverage = parseFloat(average.toString()).toFixed(1);
        yield userDb.update({ where: { id: userId }, data: { rating: fixedAverage } });
        const message = { text: "response.add" };
        return { message, rating };
    });
}
exports.default = makeRateUser;
//# sourceMappingURL=rate-user.js.map