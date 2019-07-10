const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// get posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  // .then(console.log("success"))
  // .catch(console.log("Error"));
  res.send(await posts.find({}).toArray());
  // .then(console.log("success"))
  // .catch(console.log("Error"));
});

// add posts

router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  // .then(console.log("success"))
  // .catch(console.log("Error"));
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  // .then(console.log("success"))
  // .catch(console.log("Error"));
  res.status(201).send();
});

// delete posts

router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://kirbycampbell:abc123@ds349587.mlab.com:49587/kirbyexpress",
    {
      useNewUrlParser: true
    }
  );
  // .then(console.log("success"))
  // .catch(console.log("Error"));
  return client.db("kirbyexpress").collection("posts");
}

module.exports = router;
