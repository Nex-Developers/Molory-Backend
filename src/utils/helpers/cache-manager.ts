import { promisify } from "util"
import redis from "redis"
import { env } from "../../configs/environment"

export default class CacheManager {
  static client


  static connect() {
    const config: any = { host: env.redis.host, port: env.redis.port }
    if (env.production) config.password = env.redis.password
    CacheManager.client = redis.createClient(config)
    CacheManager.client.on("error", function (error) {
      console.error('redis connection failed ', error);
    })
  }

  static selectDb() {
    const makeAsync = promisify(CacheManager.client.select).bind(CacheManager.client)
    return makeAsync(env.redis.db)
  }

  static arrayPush(array, value) {
    //   add expire delay
    const makeAsync = promisify(CacheManager.client.lpush).bind(CacheManager.client)
    return CacheManager.selectDb().then(
      () => {
        return makeAsync(array, value)
      }
    )
  }

  static findInArray(array, value) {
    const getAsync = promisify(CacheManager.client.lpos).bind(CacheManager.client)
    return CacheManager.selectDb().then(
      () => {
        return getAsync(array, value)
      }
    )
  }

  static removetAt(array, value) {
    const makeAsync = promisify(CacheManager.client.lrem).bind(CacheManager.client)
    return CacheManager.selectDb().then(
      () => {
        return makeAsync(array, 1, value)
      })
  }

  static remove(key) {
    const makeAsync = promisify(CacheManager.client.del).bind(CacheManager.client)
    return CacheManager.selectDb().then(
      () => {
        return makeAsync(key)
      })
  }

  static set(key, value, ttl = null) {
    CacheManager.client.set(key, value)
    return CacheManager.selectDb().then(
      () => {
        if (ttl) CacheManager.client.expire(key, ttl)
      })
  }

  static get(key) {
    const getAsync = promisify(CacheManager.client.get).bind(CacheManager.client)
    return CacheManager.selectDb().then(
      () => {
        return getAsync(key)
      })
  }

  static async find(key, val): Promise<boolean> {
    return CacheManager.selectDb().then(
      async () => {
        const res = await CacheManager.get(key)
        console.log('result', res)
        return res === val
      })
  }


}