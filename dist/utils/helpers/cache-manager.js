"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const util_1 = require("util");
const redis_1 = (0, tslib_1.__importDefault)(require("redis"));
const environment_1 = require("../../configs/environment");
class CacheManager {
    static connect() {
        const config = { host: environment_1.env.redis.host, port: environment_1.env.redis.port };
        if (environment_1.env.production)
            config.password = environment_1.env.redis.password;
        CacheManager.client = redis_1.default.createClient(config);
        CacheManager.client.on("error", function (error) {
            console.error('redis connection failed ', error);
        });
    }
    static arrayPush(array, value) {
        const makeAsync = (0, util_1.promisify)(CacheManager.client.lpush).bind(CacheManager.client);
        return makeAsync(array, value);
    }
    static findInArray(array, value) {
        const getAsync = (0, util_1.promisify)(CacheManager.client.lpos).bind(CacheManager.client);
        return getAsync(array, value);
    }
    static removetAt(array, value) {
        const makeAsync = (0, util_1.promisify)(CacheManager.client.lrem).bind(CacheManager.client);
        return makeAsync(array, 1, value);
    }
    static remove(key) {
        const makeAsync = (0, util_1.promisify)(CacheManager.client.del).bind(CacheManager.client);
        return makeAsync(key);
    }
    static set(key, value, ttl = 120) {
        CacheManager.client.set(key, value);
        CacheManager.client.expire(key, ttl);
    }
    static get(key) {
        const getAsync = (0, util_1.promisify)(CacheManager.client.get).bind(CacheManager.client);
        return getAsync(key);
    }
    static find(key, val) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const res = yield CacheManager.get(key);
            console.log('result', res);
            return res === val;
        });
    }
}
exports.default = CacheManager;
//# sourceMappingURL=cache-manager.js.map