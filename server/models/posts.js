const { DataTypes } = require("sequelize");
const db = require("../db");

const Post = db.define("post", {
  postTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postMessage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postType: {
    type: DataTypes.STRING,
  },
  posterName: {
    type: DataTypes.STRING,
  },
  ownerId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Post;
