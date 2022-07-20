import app from "./configs/app"
import { env } from "./configs/environment"
import initializer from "./initializer"
import { CacheManager, DbConnection, Mailer } from "./utils/helpers"


try {
    const startApp = async () => {
        await DbConnection.connect()
        await CacheManager.connect()
        await Mailer.connect()
        await initializer()
        app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
    }
    startApp()
} catch (err) {
    throw new Error(err.message)
} finally {
    DbConnection.disconnect()
}


