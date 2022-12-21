import app from "./configs/app"
import { env } from "./configs/environment"
import initializer from "./initializer"
import { CacheManager, DbConnection, Mailer } from "./utils/helpers"
import FirebaseAdmin from "./utils/helpers/firebase-admin"


try {
    const startApp = async () => {
        await DbConnection.connect()
        await CacheManager.connect()
        await Mailer.connect()
        await initializer()
        FirebaseAdmin.connect()
        // const saved = await CacheManager.get("22892942072")
        // console.log(saved)
        app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
    }
    startApp()
} catch (err) {
    throw new Error(err.message)
} finally {
    DbConnection.disconnect()
}


