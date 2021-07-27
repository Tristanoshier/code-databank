const express = require("express");
const router = express.Router();
const { Posts, Replies, PostVote } = require("../models");

// router.post("/:pId", (req, res) => {
//   try {
//     PostVote.create({
//       vote_value: req.body.vote_value,
//       ownerId: req.user.id,
//       userId: req.user.id,
//       postId: req.params.pId,
//     });
//     res.status(200).json({
//       message: "Vote successfull",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Vote failed",
//     });
//   }
// });

router.put("/:pId", (req, res) => {
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
