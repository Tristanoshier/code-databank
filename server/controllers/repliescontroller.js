const express = require("express");
const router = express.Router();
const { Posts, Replies } = require("../models");

router.get("/", (req, res) => {
  Replies.findAll({
    include: Posts,
  })
    .then((replies) => res.status(200).json(replies))
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.post("/:pId", (req, res) => {
  try {
    Replies.create({
      replyMessage: req.body.replyMessage,
      codeType: req.body.codeType,
      upVotes: req.body.upVotes,
      replyName: req.user.firstName,
      postId: req.params.pId,
      ownerId: req.user.id,
    });
    res.status(200).json({
      message: "Reply submitted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Reply failed to submit",
    });
  }
});

router.put("/:id", (req, res) => {
  const query = { where: { id: req.params.id } };
  const updateReply = {
    replyMessage: req.body.replyMessage,
    codeType: req.body.codeType,
    upVotes: req.body.upVotes,
  };
  Replies.update(updateReply, query)
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

module.exports = router;
