const express = require("express");
const router = express.Router();
const { Posts, Replies } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Multi String Search Algorithm
// O(bns) time complexity | O(n) space complexity
// - where n is the number of words in the search, s is the length of the longest word, and b is the length of the title

// var bigString is the field being searched
// var smallStrings is an array of each word in the user's search
function multiStringSearch(bigString, smallStrings) {
  return smallStrings.map((smallString) =>
    isInBigString(bigString, smallString)
  );
}

function isInBigString(bigString, smallString) {
  for (let i = 0; i < bigString.length; i++) {
    if (i + smallString.length > bigString.length) break;
    if (isInBigStringHelper(bigString, smallString, i)) return true;
  }
  return false;
}

function isInBigStringHelper(bigString, smallString, startIdx) {
  let leftBigIdx = startIdx;
  let rightBigIdx = startIdx + smallString.length - 1;
  let leftSmallIdx = 0;
  let rightSmallIdx = smallString.length - 1;
  while (leftBigIdx <= rightBigIdx) {
    if (
      bigString[leftBigIdx] != smallString[leftSmallIdx] ||
      bigString[rightBigIdx] != smallString[rightSmallIdx]
    ) {
      return false;
    }
    leftBigIdx++;
    rightBigIdx--;
    leftSmallIdx++;
    rightSmallIdx--;
  }
  return true;
}

// O(bns * p) time - where p is number of posts
// O(p) space - where p is number of posts that return more true values than false values that we store in results array
// * O(p) space should never really occur since the user input would have to cause all posts in db to pass the more true than false test but O(p) is worst case space complexity

// this complexity applies for all functions below

// search all posts by title
router.get("/all", (req, res) => {
  Posts.findAll({
    include: Replies,
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      let results = [];

      for (const post of posts) {
        let wordsInSearch = req.query.search.toLowerCase().split(" ");
        let title = post.postTitle.toLowerCase();

        let wordValues = multiStringSearch(title, wordsInSearch);

        let matchedWords = wordValues.filter((x) => x == true).length;
        let unmatchedWords = wordValues.filter((x) => x == false).length;

        if (matchedWords > unmatchedWords) results.push(post);
      }

      res.status(200).json(results);
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

// search all posts by code type for title
router.get("/type", (req, res) => {
    Posts.findAll({
      where: {
        codeType: req.query.type
      },
      include: Replies,
      order: [["createdAt", "DESC"]],
    })
      .then((posts) => {
        let results = [];
        for (const post of posts) {
          let wordsInSearch = req.query.search.toLowerCase().split(" ");
          let title = post.postTitle.toLowerCase();
  
          let wordValues = multiStringSearch(title, wordsInSearch);
  
          let matchedWords = wordValues.filter((x) => x == true).length;
          let unmatchedWords = wordValues.filter((x) => x == false).length;
  
          if (matchedWords > unmatchedWords) results.push(post);
        }
  
        res.status(200).json(results);
      })
      .catch((err) =>
        res.status(500).json({
          error: err,
        })
      );
  });


module.exports = router;
