import { PrismaClient } from "@prisma/client";

export default class DbConnection{
    static prisma =  new PrismaClient()
    static async connect(): Promise<PrismaClient> {
        await DbConnection.prisma.$connect()
        return DbConnection.prisma
    }

    static async disconnect() {
        await DbConnection.prisma.$disconnect()
    }
}