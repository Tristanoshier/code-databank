const { DataTypes, literal } = require("sequelize");
const db = require("../db");

const PostVote = db.define("postVote", {
  vote_value: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validate: {
      isIn: [[-1, 1]],
    },
  },
  ownerId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = PostVote;
