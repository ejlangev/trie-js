# trie-js

Javascript implementation of a Trie with customizable delimiters designed for use with the node environment.

[![Build Status](https://travis-ci.org/ejlangev/trie-js.svg?branch=master)](https://travis-ci.org/ejlangev/trie-js)

## Installing

`npm install trie-js`

## Creating a trie

```js
// empty Trie with default delimiter
const trie = new Trie();

// trie with some initial values
const trie = new Trie(['abc', 'def']);

// trie with some initial values that are also iterable
const trie = new Trie([['a', 'b', 'c'], ['a', 'b', 'd']]);

// trie with custom object implementing iterator
const obj1 = {
  [Symbol.iterator]: function*() {
    yield 'a';
    yield 'b';
    yield 'd'
  }
}

const trie = new Trie([obj1]);
```

## Adding, removing, and testing for values

```js
const trie = new Trie();

// Adding is chainable
trie.add('abc')
  .add('def')
  .add('ghi');

// Removing is chainable
trie.remove('abc')
  .remove('def');

trie.lookup('abc') // false
trie.lookup('ghi') // true
```

## Checking for prefixes

```js
const trie = new Trie(['abc', 'def']);

trie.isPrefix('ab') // true
trie.isPrefix('abc') // false
```
