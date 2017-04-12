const assert = require('assert');
const getObject = require('../lib/db');

describe('get object from database', () => {

  it('returns null when no object with that id is found', done => {
    getObject('./data', 'dogs', 'wrong', (err, data) => {
      assert.deepEqual(data, null);
      done();
    });
  });

  it('gets an cat given an id', done => {
    getObject('./data', 'cats', 'f1de5', (err, data) => {
      assert.deepEqual(data, {
        'name': 'fluffy',
        '_id': 'f1de5'
      });
      done();
    });
  });

  it('gets a cat given different id', done => {
    getObject('./data', 'cats', '7asn3', (err, data) => {
      assert.deepEqual(data, {
        'name': 'fred',
        '_id': '7asn3'
      });
      done();
    });
  });
  
  it('gets a dog given an id', done => {
    getObject('./data', 'dogs', 'ts21j', (err, data) => {
      assert.deepEqual(data, {
        'name': 'woof',
        '_id': 'ts21j'
      });
      done();
    });
  });

  it('gets a dog given an id', done => {
    getObject('./data', 'dogs', 'y47ad', (err, data) => {
      assert.deepEqual(data, {
        'name': 'dude',
        '_id': 'y47ad'
      });
      done();
    });
  });

});