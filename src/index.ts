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
        //send a notification
        // await FirebaseAdmin.sendNotification(
        //     [
        //         "fsNT-iUNQl2RgV_l3dLwxc:APA91bEEHGOerFccgyBL-jpWjwRE7vZFj3VQ84c4YqLKM5gz7Cn3kax9X6ZzrckQz9393N-V0F4a60m-WkbaqJ1SAldSFQsd4kiDyf_Tfhfs2HOFEiMO50cew06F7fZP-zTA4M18ZMPq",
        //         "cJO-zTFJwkesuCbMPeOToI:APA91bETD3L2cKuAuq-b3AB68TnGV9roMuyj5bQLMc98GnWIPNyiSJm43-B2GtgspXc4rKxSVSc1mkMUAfrTuq8R4mKnWcIiW2kz1-ofTlw8wj8GlcHKxCbAyrv-V-NPCLXiIWLlD-gj"
        //     ], 
        //     "Error e9093i.",
        //      "Les notifications ne marche pas.", 
        //      null, 
        //      null)
        app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
    }
    startApp()
} catch (err) {
    throw new Error(err.message)
} finally {
    DbConnection.disconnect()
}


