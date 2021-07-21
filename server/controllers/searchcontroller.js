const express = require("express");
const router = express.Router();
const { Posts, Replies } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Complexity Analysis: O(ns + bs) Time | O(ns) Space
// - where n is the number of words in the search, s is the length of the longest word, and b is the length of the title
class Trie {
  constructor() {
    this.root = {}
    this.endSymbol = '*'
  }

  add(string) {
    let currentNode = this.root
    for (const letter of string) {
      if (!(letter in currentNode)) currentNode[letter] = {}
      currentNode = currentNode[letter]
    }
    currentNode[this.endSymbol] = string
  }
}

// varirable bigString is the field being searched
// variable smallStrings is an array of each word in the user's search

function multiStringSearch(bigString, smallStrings) {
    const trie = new Trie()
    for (const string of smallStrings) {
        trie.add(string)
    }

    const containedStrings = {}
    for (let i = 0; i < bigString.length; i++) {
      findSmallStringsIn(bigString, i, trie, containedStrings)
    }

    return smallStrings.map(string => string in containedStrings)
}

function findSmallStringsIn(string, startIdx, trie, containedStrings) {
    let currentNode = trie.root

    for (let i = startIdx; i < string.length; i++) {
      const currentChar = string[i]
      if (!(currentChar in currentNode)) break
      currentNode = currentNode[currentChar]
      if (trie.endSymbol in currentNode) {
          containedStrings[currentNode[trie.endSymbol]] = true
      }
    }
}
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
