'use strict';

/**
 * @param {string[]} data - List of values to add initially
 * @param {Object} options - Config options
 * @param {string} options.delimiter - Delimiter for breaking up values
 */
function Trie(data) {
  data = data || []

  this.root = { children: {}, isFlagged: false };

  data.forEach(val => this.add(val));
}

/**
 * @param   {string} value - Value to add
 * @returns {Trie} Same instance of Trie for chaining
 */
Trie.prototype.add = function(value) {
  let current = this.root;

  for (let piece of value) {
    if (!current.children[piece]) {
      current.children[piece] = { children: {}, isFlagged: false };
    }

    current = current.children[piece];
  }

  current.isFlagged = true;
  return this;
};

/**
 * @param  {string} value - Value to remove
 * @return {Trie} Same instance of Trie for chaining
 */
Trie.prototype.remove = function(value) {
  let current = this.root;
  const hierarchy = [current];
  const words = [];

  for (let piece of value) {
    words.unshift(piece);
    if (!current.children[piece]) {
      return this;
    }

    current = current.children[piece];
    hierarchy.unshift(current);
  }

  current.isFlagged = false;

  for (let j = 0; j < hierarchy.length; j++) {
    if (Object.keys(hierarchy[j].children).length > 0 || hierarchy[j].isFlagged) {
      break;
    }

    if (j + 1 < hierarchy.length) {
      delete hierarchy[j + 1].children[words[j]];
    }
  }

  return this;
};

/**
 * @param  {string} value - Value to test for presence of
 * @return {Boolean} True if the value exists
 */
Trie.prototype.lookup = function(value) {
  let current = this.root;

  for (let piece of value) {
    if (!current.children[piece]) {
      return false;
    }

    current = current.children[piece];
  }

  return current.isFlagged;
};

/**
 * @param  {string} value - Value to test for being a isPrefix
 * @return {Boolean} True if the value is a prefix
 */
Trie.prototype.isPrefix = function(value) {
  let current = this.root;

  for (let piece of value) {
    if (!current.children[piece]) {
      return false;
    }

    current = current.children[piece];
  }

  return Object.keys(current.children).length > 0;
};

module.exports = Trie;
