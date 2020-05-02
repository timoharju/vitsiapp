const functions = require("firebase-functions");
const app = require("express")();

const cors = require("cors");
app.use(cors());

const { db } = require("./utils/admin");

const {
    getAllVitsit,
    randomVitsi,
    postOneVitsi,
    voteVitsi,
    unVoteVitsi

} = require("./handlers/vitsit");

app.get("/vitsit", getAllVitsit)

app.get("/vitsit/random", randomVitsi)
app.post("/vitsit", postOneVitsi) 
app.get("/vitsit/:vitsiId/vote", voteVitsi)
app.get("/vitsit/:vitsiId/unvote", unVoteVitsi)

exports.api = functions.region('europe-west1').https.onRequest(app);

