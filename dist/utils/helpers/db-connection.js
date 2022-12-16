"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
class DbConnection {
    static connect() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield DbConnection.prisma.$connect();
            return DbConnection.prisma;
        });
    }
    static disconnect() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield DbConnection.prisma.$disconnect();
        });
    }
}
exports.default = DbConnection;
DbConnection.prisma = new client_1.PrismaClient();
//# sourceMappingURL=db-connection.js.map