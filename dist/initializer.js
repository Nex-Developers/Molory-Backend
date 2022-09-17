"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conventions_1 = require("./core/conventions");
const user_1 = require("./core/use-cases/user");
const db_1 = require("./db");
exports.default = () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const userDb = new db_1.UserDb();
    const admin = yield userDb.findFirst({ where: { email: 'developer@nex-softwares.com' }, select: { id: true } });
    if (admin) {
        if (admin.emailVerifiedAt) {
            console.log('Admin already exists');
            return;
        }
        userDb.updateOne({ where: { id: admin.id }, data: { emailVerifiedAt: new Date() } });
        return;
    }
    const data = {
        email: 'developer@nex-softwares.com',
        password: 'Nex@2022',
        role: conventions_1.Role.ADMIN,
        firstName: 'Admin',
        lastName: 'NEX',
        phoneNumber: '22890909090',
        language: 'en',
        birthDay: new Date()
    };
    const response = yield (0, user_1.addUser)(data);
    console.log(`--> Admin user created with id: ${response.id}`);
});
//# sourceMappingURL=initializer.js.map