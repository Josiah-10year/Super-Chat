const functions = require ('firebase-functions');
const FIlter = require('bad-words');


const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
exports.detectMNegativeWords = functions.firestore
    .
