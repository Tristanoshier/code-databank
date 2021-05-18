const User = require("./user");
const Posts = require("./posts");
const Replies = require("./replies");

User.hasMany(Posts);
Posts.belongsTo(User);

Posts.hasMany(Replies);
Replies.belongsTo(Posts);

module.exports = { User, Posts, Replies };
