const functions = require ('firebase-functions');
const FIlter = require('bad-words');


const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
exports.detectMNegativeWords = functions.firestore
    .document('messages/{msgId}')
    .onCreate(async (doc,ctx) => {
        
        const filter=new Filter();
        const {test,uid} = doc.data();

        if(filter.isProface(test)){
            const cleaned = filter.clean(text);
            await doc.ref.update({text: `You got banned for life! never say ${cleaned}`});
            await db.collection('banned').doc(uid).set({});
        }
    });
