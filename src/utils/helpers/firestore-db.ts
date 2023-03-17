import { firestore } from "firebase-admin";
import { FirebaseAdmin } from ".";
import { env } from "../../configs/environment";


export default class FirestoreDb{
   
    /* 
        FIRST LEVEL OPERATION
    */

    static get(collection) {
        if(!env.production) collection += '-dev'
        return firestore(FirebaseAdmin.app)
        .collection(collection)
        .where('deletedAt', '==', null)
        .get().then(res => {
            return res.docs.map( item => { 
                return { id: item.id, ...item.data() as any}
            })
        })
    }

    static getByDoc(collection, doc) {
        if(!env.production) collection += '-dev'
        return firestore(FirebaseAdmin.app)
        .collection(collection).doc(doc)
        .get().then(res => {
            return { id: res.id, ...res.data() as any }
        })
    }

    static add(collection, data) {
        if(!env.production) collection += '-dev'
        data.createdAt = firestore.FieldValue.serverTimestamp()
        data.deletedAt = null
        return firestore(FirebaseAdmin.app)
        .collection(collection)
        .add(data)
        .then(res => res.id)
    }

    static set(collection, doc, data) {
        if(!env.production) collection += '-dev'
        // data.createdAt = firestore.FieldValue.serverTimestamp()
        // data.deletedAt = null
        return firestore(FirebaseAdmin.app)
        .collection(collection).doc(doc)
        .set(data).then(res => res.writeTime)
    }

    static update(collection, doc, data) {
        if(!env.production) collection += '-dev'
        data.updatedAt = firestore.FieldValue.serverTimestamp()
        return firestore(FirebaseAdmin.app).
        collection(collection).doc(doc)
        .update(data).then(res => res.writeTime)
    }

    static softDelete(collection, doc) {
        if(!env.production) collection += '-dev'
        const deletedAt = firestore.FieldValue.serverTimestamp()
        return firestore(FirebaseAdmin.app).
        collection(collection).doc(doc)
        .update({ deletedAt }).then(res => res.writeTime)
    }

    static delete(collection, doc) {
        if(!env.production) collection += '-dev'
        return firestore(FirebaseAdmin.app)
        .collection(collection).doc(doc)
        .delete()
    }

     /* 
        SECOND LEVEL OPERATION
    */

    static getInCollection(collection, doc, subCollection) {
        if(!env.production) collection += '-dev'
        return firestore(FirebaseAdmin.app)
        .collection(collection).doc(doc)
        .collection(subCollection)
        .where('deletedAt', '==', null)
        .get().then(
            res => {
                return res.docs.map( item => { 
                    return { id: item.id, ...item.data() as any}
                })
            }
        )
    }

    static getInCollectionByDoc(collection, doc, subCollection, subDoc) {
        if(!env.production) collection += '-dev'
        return firestore(FirebaseAdmin.app)
        .collection(collection).doc(doc)
        .collection(subCollection).doc(subDoc)
        .get().then(res => {
            return { id: res.id, ...res.data() as any }
        })
    }

    static addInCollection(collection, doc, subCollection, data) {
        if(!env.production) collection += '-dev'
        data.createdAt = firestore.FieldValue.serverTimestamp()
        data.seenAt = null
        // data.deletedAt = null
        return firestore(FirebaseAdmin.app)
        .collection(collection).doc(doc)
        .collection(subCollection)
        .add(data).then(res => res.id)
    }

    static setInCollection(collection, doc, subCollection, subDoc, data) {
        if(!env.production) collection += '-dev'
        data.createdAt = firestore.FieldValue.serverTimestamp()
        data.deletedAt = null
        return firestore(FirebaseAdmin.app)
        .collection(collection).doc(doc)
        .collection(subCollection).doc(subDoc)
        .set(data).then(res => res.writeTime)
    }

    static updateInCollection(collection, doc, subCollection, subDoc, data) {
        if(!env.production) collection += '-dev'
        data.updatedAt = firestore.FieldValue.serverTimestamp()
        return firestore(FirebaseAdmin.app)
        .collection(collection).doc(doc)
        .collection(subCollection).doc(subDoc)
        .update(data).then(res => res.writeTime)
    }
    static softDeleteInCollection(collection, doc, subCollection, subDoc) {
        if(!env.production) collection += '-dev'
        const deletedAt = firestore.FieldValue.serverTimestamp()
        return firestore(FirebaseAdmin.app)
        .collection(collection).doc(doc)
        .collection(subCollection).doc(subDoc)
        .update({ deletedAt }).then(res => res.writeTime)
    }

    static deleteInCollection(collection, doc, subCollection, subDoc) {
        if(!env.production) collection += '-dev'
        return firestore(FirebaseAdmin.app)
        .collection(collection).doc(doc)
        .collection(subCollection).doc(subDoc)
        .delete()
    }


}