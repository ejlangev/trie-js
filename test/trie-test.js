'use strict';

const expect = require('chai').expect;

const Trie = require('../');

describe('Trie', function() {
  describe('.add', function() {
    it('can add and lookup with no delimiter', function() {
      const trie = new Trie();

      trie.add('abc');
      trie.add('abd');
      trie.add('aef');

      expect(trie.lookup('abc')).to.be.true;
      expect(trie.lookup('abd')).to.be.true;
      expect(trie.lookup('aef')).to.be.true;
      expect(trie.lookup('abx')).to.be.false;
    });

    it('can add and lookup with a non string', function() {
      const trie = new Trie([])
      trie.add(['a', 'b', 'c']);
      trie.add(['a', 'b', 'd']);
      trie.add(['a', 'e', 'f']);

      expect(trie.lookup(['a', 'b', 'c'])).to.be.true;
      expect(trie.lookup(['a', 'b', 'd'])).to.be.true;
      expect(trie.lookup(['a', 'e', 'f'])).to.be.true;
      expect(trie.lookup(['a', 'b', 'x'])).to.be.false;
    });

    it('can add and lookup an custom iterator', function() {
      const obj1 = {
        [Symbol.iterator]: function*() {
          yield 'a';
          yield 'b';
          yield 'c';
        }
      };

      const obj2 = {
        [Symbol.iterator]: function*() {
          yield 'a';
          yield 'b';
          yield 'd';
        }
      };

      const trie = new Trie([]);
      trie.add(obj1);

      expect(trie.lookup(obj1)).to.be.true;
      expect(trie.lookup(obj2)).to.be.false;
    });

    it('can chain add calls', function() {
      const trie = new Trie();

      trie.add('abc')
        .add('def');

      expect(trie.lookup('abc')).to.be.true;
      expect(trie.lookup('def')).to.be.true;
    })
  });

  describe('.remove', function() {
    let trie;

    beforeEach(() => {
      trie = new Trie(['abc', 'abd', 'aef']);
    });

    it('can remove an entry', function() {
      trie.remove('abd');
      expect(trie.lookup('abd')).to.be.false;
    });

    it('can handle a non-existent entry', function() {
      trie.remove('xyz');
      expect(trie.lookup('abc')).to.be.true;
    });

    it('can handle removing a key with a prefix of it as a value', function() {
      trie.add('ab');
      trie.add('ae');
      trie.remove('abc');
      trie.remove('ae');
      expect(trie.lookup('ab')).to.be.true;
      expect(trie.lookup('aef')).to.be.true;
      expect(trie.lookup('ae')).to.be.false;
    });

    it('can chain remove calls', function() {
      trie.remove('abd').remove('aef');
      expect(trie.lookup('abd')).to.be.false;
      expect(trie.lookup('aef')).to.be.false;
    });
  });

  describe('.isPrefix', function() {
    let trie;

    beforeEach(() => {
      trie = new Trie(['abc', 'abd', 'aef']);
    });

    it('can test for prefixes', function() {
      expect(trie.isPrefix('ab')).to.be.true;
      expect(trie.isPrefix('ae')).to.be.true;
      expect(trie.isPrefix('abc')).to.be.false;
    });

    it('works when values are prefixes', function() {
      trie.add('ab');
      expect(trie.isPrefix('ab')).to.be.true;
    })
  });
});
