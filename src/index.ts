import app from "./configs/app"
import { env } from "./configs/environment"
import environment from "./configs/environment/environment"
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
        app.listen(env.port, () => {
            console.log(`env args production: `, environment.production )
            console.log(`Server  running at http://localhost:${env.port} since `, new Date())
        })
    }
    startApp()
} catch (err) {
    throw new Error(err.message)
} finally {
    DbConnection.disconnect()
}
