const { db } = require("../utils/admin");

exports.getAllVitsit = (req, res) => {
  db.collection("vitsit")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let vitsit = [];
      data.forEach((doc) => {
        vitsit.push({
          vitsiId: doc.id,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
          voteCount: doc.data().voteCount,
        });
      });
      return res.json(vitsit);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
exports.postOneVitsi = (req, res) => {
  if (req.body.body.trim() == "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newVitsi = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    voteCount: 0,
  };

  db.collection("vitsit")
    .add(newVitsi)
    .then((doc) => {
      const resVitsi = newVitsi;
      resVitsi.vitsiId = doc.id;
      res.json(resVitsi);
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
    });
};

exports.getVitsiVote = (req, res) => {
  let vitsiData = {};
  db.doc(`/vitsit/${req.params.vitsiId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Vitsi not found" });
      }
      vitsiData = doc.data();
      vitsiData.vitsiId = doc.id;
      return db
        .collection("vitsit")
        .orderBy("createdAt", "desc")
        .where("vitsiId", "==", req.params.vitsiId)
        .get();
    })
    .then((data) => {
      voteCounts = [];
      data.forEach((doc) => {
        vitsit.push({
          voteCount: doc.data().voteCount,
        });
      });
      return res.json(voteCounts);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.getOneVitsi = (req, res) => {
  let vitsiData = {};
  db.doc(`/vitsit/${req.params.vitsiId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Vitsi not found" });
      }
      vitsiData = doc.data();
      vitsiData.vitsiId = doc.id;
      return db
        .collection("vitsit")
        .orderBy("createdAt", "desc")
        .where("vitsiId", "==", req.params.vitsiId)
        .get();
    })
    .then((data) => {
      vitsiData.vitsit = [];
      data.forEach((doc) => {
        vitsiData.vitsit.push(doc.data());
      });
      return res.json(vitsiData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.voteVitsi = (req, res) => {
  const voteDocument = db
    .collection("votes")
    .where("vitsiId", "==", req.params.vitsiId)
    .limit(1);

  const vitsiDocument = db.doc(`/vitsit/${req.params.vitsiId}`);

  let vitsiData;

  vitsiDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        vitsiData = doc.data();
        vitsiData.vitsiId = doc.id;
        return voteDocument.get();
      } else {
        return res.status(404).json({ error: "Vitsi not found" });
      }
    })
    .then((data) => {
      return db
        .collection("votes")
        .add({
          vitsiId: req.params.vitsiId,
        })
        .then(() => {
          vitsiData.voteCount++;
          return vitsiDocument.update({ voteCount: vitsiData.voteCount });
        })
        .then(() => {
          return res.json(vitsiData);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.unVoteVitsi = (req, res) => {
  const voteDocument = db
    .collection("votes")
    .where("vitsiId", "==", req.params.vitsiId);

  const vitsiDocument = db.doc(`/vitsit/${req.params.vitsiId}`);

  let vitsiData;

  vitsiDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        vitsiData = doc.data();
        vitsiData.vitsiId = doc.id;
        return voteDocument.get();
      } else {
        return res.status(404).json({ error: "Vitsi not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Vitsi not voted" });
      } else {
        return db
          .doc(`/votes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            vitsiData.voteCount--;
            return vitsiDocument.update({ voteCount: vitsiData.voteCount });
          })
          .then(() => {
            res.json(vitsiData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.randomVitsi = (req, res) => {
  db.collection("vitsit")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let vitsit = [];
      data.forEach((doc) => {
        vitsit.push({
          vitsiId: doc.id,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
          voteCount: doc.data().voteCount,
        });
      });
      var ranVitsi = vitsit[Math.floor(Math.random()*vitsit.length)];
      return res.json(ranVitsi);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};