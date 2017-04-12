const assert = require('assert');
const getObject = require('../lib/lab');

describe('get object', () => {
  it('gets a cat given an id', done => {
    getObject('./data', 'cats', 'f1de5', (err, data) => {
      assert.deepEqual(data, {
        '_id': 'f1de5',
        'name': 'fluffy'
      });
      done();
    });
  });

  it('gets second cat given an id', done => {
    getObject('./data', 'cats', '0xe34', (err, data) => {
      assert.deepEqual(data, {
        '_id': '0xe34',
        'name': 'swift smasher'
      });
      done();
    });
  });

  it('gets a dog given an id', done => {
    getObject('./data', 'dogs', 'l33t0', (err, data) => {
      assert.deepEqual(data, {
        '_id': 'l33t0',
        'name': 'bowwow'
      });
      done();
    });
  });

  it('gets second dog given an id', done => {
    getObject('./data', 'dogs', '6ht7u', (err, data) => {
      assert.deepEqual(data, {
        '_id': '6ht7u',
        'name': 'mr sprinkles'
      });
      done();
    });
  });

  it('returns null when can\'t find object by id', done => {
    getObject('./data', 'cats', 'doesnotexist', (err, data) => {
      assert.equal(data, null);
      done();
    });
  });
});