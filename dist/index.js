"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = (0, tslib_1.__importDefault)(require("./configs/app"));
const environment_1 = require("./configs/environment");
const environment_2 = (0, tslib_1.__importDefault)(require("./configs/environment/environment"));
const initializer_1 = (0, tslib_1.__importDefault)(require("./initializer"));
const helpers_1 = require("./utils/helpers");
const firebase_admin_1 = (0, tslib_1.__importDefault)(require("./utils/helpers/firebase-admin"));
try {
    const startApp = () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        yield helpers_1.DbConnection.connect();
        yield helpers_1.CacheManager.connect();
        yield helpers_1.Mailer.connect();
        yield (0, initializer_1.default)();
        firebase_admin_1.default.connect();
        app_1.default.listen(environment_1.env.port, () => {
            console.log(`env args production: `, environment_2.default.production);
            console.log(`Server  running at http://localhost:${environment_1.env.port} since `, new Date());
        });
    });
    startApp();
}
catch (err) {
    throw new Error(err.message);
}
finally {
    helpers_1.DbConnection.disconnect();
}
//# sourceMappingURL=index.js.map