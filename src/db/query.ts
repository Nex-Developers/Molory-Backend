import { env } from "../configs/environment";
import { DbConnection } from "../utils/helpers";

export default class Query <T> {
    collection
    constructor(collectionName) {
        this.collection = DbConnection.prisma[collectionName];
    }

    async findMany({ 
        startAt,
        limit,
        select, 
        where,
        orderBy
    }): Promise<T[]> {
        if(env.db.softDelete) where = { ...where, deletedAt: null }
        return await this.collection.findMany({
            take: limit,
            skip: startAt,
            select, 
            where,
            orderBy
        })
    }


    async findManyInTrash({ 
        startAt,
        limit,
        select,
        orderBy,
        where
    }): Promise<T[]> {
         where = { ...where, deletedAt:  { not: null }}
        const order = { deletedAt: 'desc'}
        if(orderBy)  orderBy.push(order)
        else orderBy = [order]
        return await this.collection.findMany({
            take: limit,
            skip: startAt,
            select, 
            where,
            orderBy
        })
    }

    async findFirst({
        where,
        select
    }): Promise<T> {
        if(env.db.softDelete) where = { ...where, deletedAt: null }
        return await this.collection.findFirst({ where, select })
    }

    async findFirstInTrash({
        where,
        select
    }): Promise<T> {
         where = { ...where, deletedAt:  { not: null} }
        return await this.collection.findFirst({ where, select })
    }


    async insertOne({ data, include }): Promise<T> {
        return await this.collection.create({ data, include })
    }

    async updateOne({ where, data }): Promise<T> {
        return await this.collection.update({ where, data})
    }

    async insertOrUpdate({ where, create, update }): Promise<T> {
        return await this.collection.upsert({ where, create, update})
    }

    async deleteOne({ where, force }) {
        if (env.db.softDelete && !force) return this.softDelete({ where })
        else return await this.collection.delete({ where })
    }

    async softDelete({ where }) {
        return await this.collection.update({ where, data: { deletedAt: new Date()}})
    }


    async deleteMany({where, force }) {
        console.log('deleteMany', where, force)
        if (env.db.softDelete && !force) return this.softDelete({ where })
        else return await this.collection.deleteMany({ where })
    }

}