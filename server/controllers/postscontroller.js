const express = require("express");
const router = express.Router();
const { Posts, Replies } = require("../models");

router.get("/", (req, res) => {
  Posts.findAll({
    include: Replies,
  })
    .then((posts) => res.status(200).json(posts))
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.post("/", (req, res) => {
  try {
    Posts.create({
      postTitle: req.body.postTitle,
      postMessage: req.body.postMessage,
      posterName: req.user.firstName,
      ownerId: req.user.id,
    });
    res.status(200).json({
      message: "Post submitted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Post failed to submit",
    });
  }
});

module.exports = router;
