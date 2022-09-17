"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const environment_1 = require("../configs/environment");
const helpers_1 = require("../utils/helpers");
class Query {
    constructor(collectionName) {
        this.collection = helpers_1.DbConnection.prisma[collectionName];
    }
    findMany({ startAt, limit, select, where, orderBy }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (environment_1.env.db.softDelete)
                where = Object.assign(Object.assign({}, where), { deletedAt: null });
            return yield this.collection.findMany({
                take: limit,
                skip: startAt,
                select,
                where,
                orderBy
            });
        });
    }
    findManyInTrash({ startAt, limit, select, orderBy, where }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            where = Object.assign(Object.assign({}, where), { deletedAt: { not: null } });
            const order = { deletedAt: 'desc' };
            if (orderBy)
                orderBy.push(order);
            else
                orderBy = [order];
            return yield this.collection.findMany({
                take: limit,
                skip: startAt,
                select,
                where,
                orderBy
            });
        });
    }
    findFirst({ where, select }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (environment_1.env.db.softDelete)
                where = Object.assign(Object.assign({}, where), { deletedAt: null });
            return yield this.collection.findFirst({ where, select });
        });
    }
    findFirstInTrash({ where, select }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            where = Object.assign(Object.assign({}, where), { deletedAt: { not: null } });
            return yield this.collection.findFirst({ where, select });
        });
    }
    insertOne({ data, include }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.collection.create({ data, include });
        });
    }
    updateOne({ where, data }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.collection.update({ where, data });
        });
    }
    insertOrUpdate({ where, create, update }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.collection.upsert({ where, create, update });
        });
    }
    deleteOne({ where }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (environment_1.env.db.softDelete)
                return this.softDeleteOne({ where });
            else
                return yield this.collection.delete({ where });
        });
    }
    softDeleteOne({ where }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.collection.update({ where, data: { deletedAt: new Date() } });
        });
    }
}
exports.default = Query;
//# sourceMappingURL=query.js.map