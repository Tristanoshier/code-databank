const { DataTypes } = require("sequelize");
const db = require("../db");

const Reply = db.define("reply", {
  replyMessage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  codeType: {
    type: DataTypes.STRING,
  },
  replyName: {
    type: DataTypes.STRING,
  },
  upVotes: {
    type: DataTypes.INTEGER,
  },
  ownerId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Reply;
