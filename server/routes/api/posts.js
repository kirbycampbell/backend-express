const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// get posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// add posts
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text.text,
    title: req.body.text.title,
    image: req.body.text.image,
    createdAt: new Date()
  });
  res.status(201).send();
});

// delete posts
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

//loadPostsCollection from MongoDB
async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://kirbycampbell:abc123@ds349587.mlab.com:49587/kirbyexpress",
    {
      useNewUrlParser: true
    }
  );
  return client.db("kirbyexpress").collection("posts");
}

module.exports = router;
