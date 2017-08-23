# trie-js

Javascript implementation of a Trie with customizable delimiters designed for use with the node environment.

## Installing

`npm install trie-js`

## Creating a trie

```js
// empty Trie with default delimiter
const trie = new Trie();

// trie with some initial values
const trie = new Trie(['abc', 'def']);

// trie with some initial values and a specific delimiter
const trie = new Trie(['/a/b/c', '/d/e/f'], { delimiter: '/' });
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
