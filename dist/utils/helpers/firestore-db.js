"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const _1 = require(".");
const environment_1 = require("../../configs/environment");
class FirestoreDb {
    static get(collection) {
        if (!environment_1.env.production)
            collection += '-dev';
        return (0, firebase_admin_1.firestore)(_1.FirebaseAdmin.app)
            .collection(collection)
            .where('deletedAt', '==', null)
            .get().then(res => {
            return res.docs.map(item => {
                return Object.assign({ id: item.id }, item.data());
            });
        });
    }
    static getByDoc(collection, doc) {
        if (!environment_1.env.production)
            collection += '-dev';
        return (0, firebase_admin_1.firestore)(_1.FirebaseAdmin.app)
            .collection(collection).doc(doc)
            .get().then(res => {
            return Object.assign({ id: res.id }, res.data());
        });
    }
    static add(collection, data) {
        if (!environment_1.env.production)
            collection += '-dev';
        data.createdAt = firebase_admin_1.firestore.FieldValue.serverTimestamp();
        data.deletedAt = null;
        return (0, firebase_admin_1.firestore)(_1.FirebaseAdmin.app)
            .collection(collection)
            .add(data)
            .then(res => res.id);
    }
    static set(collection, doc, data) {
        if (!environment_1.env.production)
            collection += '-dev';
        return (0, firebase_admin_1.firestore)(_1.FirebaseAdmin.app)
            .collection(collection).doc(doc)
            .set(data).then(res => res.writeTime);
    }
    static update(collection, doc, data) {
        if (!environment_1.env.production)
            collection += '-dev';
        data.updatedAt = firebase_admin_1.firestore.FieldValue.serverTimestamp();
        return (0, firebase_admin_1.firestore)(_1.FirebaseAdmin.app).
            collection(collection).doc(doc)
            .update(data).then(res => res.writeTime);
    }
    static softDelete(collection, doc) {
        if (!environment_1.env.production)
            collection += '-dev';
        const deletedAt = firebase_admin_1.firestore.FieldValue.serverTimestamp();
        return (0, firebase_admin_1.firestore)(_1.FirebaseAdmin.app).
            collection(collection).doc(doc)
            .update({ deletedAt }).then(res => res.writeTime);
    }
    static delete(collection, doc) {
        if (!environment_1.env.production)
            collection += '-dev';
        return (0, firebase_admin_1.firestore)(_1.FirebaseAdmin.app)
            .collection(collection).doc(doc)
            .delete();
    }
    static getInCollection(collection, doc, subCollection) {
        return (0, firebase_admin_1.firestore)(_1.FirebaseAdmin.app)
            .collection(collection).doc(doc)
            .collection(subCollection)
            .where('deletedAt', '==', null)
            .get().then(res => {
            return res.docs.map(item => {
                return Object.assign({ id: item.id }, item.data());
            });
        });
    }
    static getInCollectionByDoc(collection, doc, subCollection, subDoc) {
        return (0, firebase_admin_1.firestore)(_1.FirebaseAdmin.app)
            .collection(collection).doc(doc)
            .collection(subCollection).doc(subDoc)
            .get().then(res => {
            return Object.assign({ id: res.id }, res.data());
        });
    }
    static addInCollection(collection, doc, subCollection, data) {
        data.createdAt = firebase_admin_1.firestore.FieldValue.serverTimestamp();
        data.seenAt = null;
        return (0, firebase_admin_1.firestore)(_1.FirebaseAdmin.app)
            .collection(collection).doc(doc)
            .collection(subCollection)
            .add(data).then(res => res.id);
    }
    static setInCollection(collection, doc, subCollection, subDoc, data) {
        data.createdAt = firebase_admin_1.firestore.FieldValue.serverTimestamp();
        data.deletedAt = null;
        return (0, firebase_admin_1.firestore)(_1.FirebaseAdmin.app)
            .collection(collection).doc(doc)
            .collection(subCollection).doc(subDoc)
            .set(data).then(res => res.writeTime);
    }
    static updateInCollection(collection, doc, subCollection, subDoc, data) {
        data.updatedAt = firebase_admin_1.firestore.FieldValue.serverTimestamp();
        return (0, firebase_admin_1.firestore)(_1.FirebaseAdmin.app)
            .collection(collection).doc(doc)
            .collection(subCollection).doc(subDoc)
            .update(data).then(res => res.writeTime);
    }
    static softDeleteInCollection(collection, doc, subCollection, subDoc) {
        const deletedAt = firebase_admin_1.firestore.FieldValue.serverTimestamp();
        return (0, firebase_admin_1.firestore)(_1.FirebaseAdmin.app)
            .collection(collection).doc(doc)
            .collection(subCollection).doc(subDoc)
            .update({ deletedAt }).then(res => res.writeTime);
    }
    static deleteInCollection(collection, doc, subCollection, subDoc) {
        return (0, firebase_admin_1.firestore)(_1.FirebaseAdmin.app)
            .collection(collection).doc(doc)
            .collection(subCollection).doc(subDoc)
            .delete();
    }
}
exports.default = FirestoreDb;
//# sourceMappingURL=firestore-db.js.map