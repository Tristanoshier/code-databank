const router = require("express").Router();
const { User, Posts, Replies } = require("../models");
const validateSession = require("../middleware/validate-session");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UniqueConstraintError } = require("sequelize/lib/errors");

router.get("/loggedInUser", validateSession, (req, res) => {
  User.findAll({
    include: [{ model: Posts, include: Replies }],
    where: {
      id: req.user.id,
    },
  })
    .then((user) =>
      res.status(200).json({
        user: user,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.post("/register", async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 13),
    });

    let token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    res.status(201).json({
      message: "User successfully registered",
      user: newUser,
      token,
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "Email already in use",
      });
    } else {
      res.status(500).json({
        message: "Failed to register user",
      });
    }
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let loginUser = await User.findOne({
      where: { email },
    });

    if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
      const token = jwt.sign(
        { id: loginUser.id, email: loginUser.email },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 24 }
      );

      res.status(200).json({
        message: "Login succeeded!",
        user: loginUser,
        token,
      });
    } else {
      res.status(401).json({
        message: "Login Failed: User information incorrect.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error logging in!",
    });
  }
});

// router.get("/savePost", (req, res) => {
// const postQuery = Posts.findOne({
//   where: {
//     id: req.params.id,
//   },
// })
//   .then((post) => res.status(200).json(post))
//   .catch((err) => res.status(500).json(err));

// User.findAll({
//   where: {
//     id: req.user.id,
//   },
// })
//   .then((user) =>
//     res.status(200).json({
//       user: user,
//     })
//   )
//   .catch((err) =>
//     res.status(500).json({
//       error: err,
//     })
//   );

// let savedPost = {
//   savedPosts: postQuery,
// };

// User.update(userQuery, savedPost)
//   .then(
//     res.status(200).json({
//       message: "success",
//     })
//   )
//   .catch((err) =>
//     res.status(500).json({
//       message: "failed",
//     })
//   );
// .then((data) => console.log(data));
// console.log(postQuery);
// console.log(postQuery);

// const userQuery = User.findOne({
//   id: req.user.id,
// });
// const savedPost = {
//   savedPosts: query,
// };
// try {
//   User.update(savedPost, userQuery, postQuery).then(
//     res.status(200).json({
//       message: "Post saved",
//     })
//   );
// } catch (error) {
//   console.log(error);
//   res.status(500).json({
//     message: "Failed to save post",
//   });
// }
// try {
//   User.update({
//     where: Posts.findOne({
//       id: req.params.id,
//     }),
//   }).then(
//     res.status(200).json({
//       message: "Saved post!",
//     })
//   );
// } catch (error) {
//   res.status(500).json({
//     message: "Failed to save post.",
//     error,
//   });
// }
// });

module.exports = router;
