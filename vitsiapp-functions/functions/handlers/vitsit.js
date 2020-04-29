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
          likeCount: doc.data.likeCount,
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
    likeCount: 0,
  };

  db.collection("vitsit")
    .add(newVitsi)
    .then((doc) => {
      const resVitsi = newVitsi;
      resVitsi.vitsiId = doc.id;
      res.json(resVitsi);
    })
    .catch((err)=> {
        res.status(500).json({ error: "something went wrong"});
    });
};
