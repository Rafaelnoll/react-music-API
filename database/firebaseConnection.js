const admin = require("firebase-admin");
const serviceAccount = require("../serviceFireStore.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const database = admin.firestore();

modules.exports = { database };