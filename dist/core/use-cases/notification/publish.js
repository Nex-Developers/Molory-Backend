"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
exports.default = ({ notifyUser }) => {
    if (!notifyUser)
        throw new errors_1.ServerError();
    return ({ userId, title, body }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        if (!title)
            throw new errors_1.MissingParamError('id');
        if (!body)
            throw new errors_1.MissingParamError('userId');
        const prisma = helpers_1.DbConnection.prisma;
        const { id } = yield prisma.publication.create({ data: { title, message: body, user: { connect: { id: userId } } } });
        const users = yield prisma.user.findMany({ where: { role: { not: 'admin' } } });
        console.log('users', users);
        yield users.forEach((user) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            console.log(user.id, id);
            yield prisma.notification.create({
                data: {
                    publicationId: id,
                    receiverId: user.id
                }
            });
            notifyUser({ id: userId, title, message: body, cover: null, data: { res: 'INFOS' }, lang: 'fr', type: 'announce' });
        }));
        const message = { text: 'response.add' };
        return { message };
    });
};
//# sourceMappingURL=publish.js.map