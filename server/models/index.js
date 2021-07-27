const User = require("./user");
const Posts = require("./posts");
const Replies = require("./replies");
const Profile = require("./profile");

User.hasMany(Posts);
Posts.belongsTo(User);

Posts.hasMany(Replies);
Replies.belongsTo(Posts);

module.exports = { User, Posts, Replies, Profile };
