const { DataTypes } = require("sequelize");
const db = require("../db");

const Profile = db.define("profile", {
  postTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postMessage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postCode: {
    type: DataTypes.TEXT,
  },
  postType: {
    type: DataTypes.STRING,
  },
  codeType: {
    type: DataTypes.STRING,
  },
  posterName: {
    type: DataTypes.STRING,
  },
  upVotes: {
    type: DataTypes.INTEGER,
  },
  ownerId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Profile;
