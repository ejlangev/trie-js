'use strict';

/**
 * @param  {string} value - String to split up
 * @param  {string} delimiter - String to split on
 * @return {string[]}
 */
function splitValue(value, delimiter) {
  return value.split(delimiter).filter(Boolean);
}

/**
 * @param {string[]} data - List of values to add initially
 * @param {Object} options - Config options
 * @param {string} options.delimiter - Delimiter for breaking up values
 */
function Trie(data, options) {
  data = data || []
  options = options || {}

  this.delimiter = options.delimiter || '';
  this.root = { children: {}, isFlagged: false };

  data.forEach(val => this.add(val));
}

/**
 * @param   {string} value - Value to add
 * @returns {Trie} Same instance of Trie for chaining
 */
Trie.prototype.add = function(value) {
  let current = this.root;
  const pieces = splitValue(value, this.delimiter);

  for (let i = 0; i < pieces.length; i++) {
    if (!current.children[pieces[i]]) {
      current.children[pieces[i]] = { children: {}, isFlagged: false };
    }

    current = current.children[pieces[i]];
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
  const pieces = splitValue(value, this.delimiter);
  const hierarchy = [current];
  const words = [];

  for (let i = 0; i < pieces.length; i++) {
    words.unshift(pieces[i]);
    if (!current.children[pieces[i]]) {
      return this;
    }

    current = current.children[pieces[i]];
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
  const pieces = splitValue(value, this.delimiter);

  for (let i = 0; i < pieces.length; i++) {
    if (!current.children[pieces[i]]) {
      return false;
    }

    current = current.children[pieces[i]];
  }

  return current.isFlagged;
};

/**
 * @param  {string} value - Value to test for being a isPrefix
 * @return {Boolean} True if the value is a prefix
 */
Trie.prototype.isPrefix = function(value) {
  let current = this.root;
  const pieces = splitValue(value, this.delimiter);

  for (let i = 0; i < pieces.length; i++) {
    if (!current.children[pieces[i]]) {
      return false;
    }

    current = current.children[pieces[i]];
  }

  return Object.keys(current.children).length > 0;
};

module.exports = Trie;
