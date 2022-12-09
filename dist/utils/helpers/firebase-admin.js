"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const admin = (0, tslib_1.__importStar)(require("firebase-admin"));
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const firebase_admin_1 = require("firebase-admin");
class FirebaseAdmin {
    static connect() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const serviceAccountData = fs_1.default.readFileSync('firebase/service-account-key.json');
            const serviceAccount = JSON.parse(serviceAccountData.toString());
            FirebaseAdmin.app = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            return;
        });
    }
    static sendNotification(tokens, title, body, data, picture) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log(picture);
            const payload = {
                notification: {
                    title,
                    body,
                    sound: 'default',
                    badge: '1'
                },
            };
            if (data)
                payload.data = data;
            const options = {
                priority: 'high',
                timeToLive: 60 * 60 * 24
            };
            return yield (0, firebase_admin_1.messaging)(FirebaseAdmin.app).sendToDevice(tokens, payload, options);
        });
    }
}
exports.default = FirebaseAdmin;
//# sourceMappingURL=firebase-admin.js.map