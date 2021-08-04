const express = require("express");
const router = express.Router();
const { PostVote } = require("../models");
const validateSession = require("../middleware/validate-session");

router.put("/:pId", validateSession, (req, res) => {
  const query = {
    where: {
      postId: req.params.pId,
    },
  };
  const updateVote = {
    vote_value: req.body.vote_value,
  };
  PostVote.update(updateVote, query)
    .then(
      res.status(200).json({
        message: "Vote succesfull",
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: "Vote failed",
        err,
      })
    );
});

module.exports = router;
