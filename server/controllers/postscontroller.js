const express = require("express");
const router = express.Router();
const { Posts, Replies } = require("../models");
const Sequelize = require("sequelize");
const validateSession = require("../middleware/validate-session");
const Op = Sequelize.Op;

// RECENT ON DASHBOARD
router.get("/infinite", (req, res) => {
  Posts.findAll({
    include: Replies,
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      const page = req.query.page;
      const limit = req.query.limit;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = posts.slice(startIndex, endIndex);
      res.status(200).json(results);
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.get("/", (req, res) => {
  Posts.findAll({
    include: Replies,
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

// MOST POPULAR POSTS FOR DASHBOARD
router.get("/popular/dashboard", (req, res) => {
  Posts.findAll({
    where: {
      upVotes: {
        [Op.ne]: null,
      },
    },
    include: Replies,
    order: [["upVotes", "DESC"]],
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

// MOST POPULAR POSTS ON POPULAR PAGE
router.get("/popular/infinite", (req, res) => {
  Posts.findAll({
    where: {
      upVotes: {
        [Op.ne]: null,
      },
    },
    include: Replies,
    order: [["upVotes", "DESC"]],
  })
    .then((posts) => {
      const page = req.query.page;
      const limit = req.query.limit;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = posts.slice(startIndex, endIndex);
      res.status(200).json(results);
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.get("/popular", (req, res) => {
  Posts.findAll({
    where: {
      upVotes: {
        [Op.ne]: null,
      },
    },
    include: Replies,
    order: [["upVotes", "DESC"]],
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
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

router.post("/", validateSession, (req, res) => {
  try {
    Posts.create({
      postTitle: req.body.postTitle,
      postMessage: req.body.postMessage,
      postCode: req.body.postCode,
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

router.put("/:id", validateSession, (req, res) => {
  const query = {
    where: {
      id: req.params.id,
      ownerId: req.user.id,
    },
  };
  const updatePost = {
    postTitle: req.body.postTitle,
    postMessage: req.body.postMessage,
    postCode: req.body.postCode,
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

router.put("/vote/:id", validateSession, (req, res) => {
  const query = {
    where: {
      id: req.params.id,
    },
  };
  const updatePost = {
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

router.delete("/:id", validateSession, (req, res) => {
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
