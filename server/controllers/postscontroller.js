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

router.get("/:id", (req, res) => {
  Posts.findOne({
    where: {
      id: req.params.id,
    },
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
      postType: req.body.postType,
      codeType: req.body.codeType,
      posterName: req.user.firstName,
      upVotes: req.body.upVotes,
      ownerId: req.user.id,
      userId: req.user.id,
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

router.put("/:id", (req, res) => {
  const query = { where: { id: req.params.id, ownerId: req.user.id } };
  const updatePost = {
    postTitle: req.body.postTitle,
    postMessage: req.body.postMessage,
    postType: req.body.postType,
    codeType: req.body.codeType,
    posterName: req.user.firstName,
    upVotes: req.body.upVotes,
  };
  Posts.update(updatePost, query)
    .then(
      res.status(200).json({
        message: "Updated",
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: "Failed to update",
      })
    );
});

router.delete("/:id", (req, res) => {
  Posts.destroy({
    where: {
      id: req.params.id,
      ownerId: req.user.id,
    },
  })
    .then((post) =>
      res.status(200).json({
        post: post,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

module.exports = router;
