const functions = require("firebase-functions");
const app = require("express")();

const cors = require("cors");
app.use(cors());

const { db } = require("./utils/admin");

const {
    getAllVitsit,
    postOneVitsi,

} = require("./handlers/vitsit");

app.get("/vitsit", getAllVitsit)
app.post("/vitsit", postOneVitsi) 

exports.api = functions.region('europe-west1').https.onRequest(app);