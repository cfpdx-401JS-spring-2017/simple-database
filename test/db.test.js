const fs = require('fs');
const assert = require('assert');
const getObject = require('../lib/db');

describe('get object from database', () => {

  it('gets an object given an id', done => {
    getObject('./data', 'cats', 'f1de5', (err, data) => {
      assert.deepEqual(data, {
        'name': 'fluffy',
        '_id': 'f1de5'
      });
      done();
    });
  });

  it('gets a cat object from database with different id', done => {
    getObject('./data', 'cats', '7asn3', (err, data) => {
      assert.deepEqual(data, {
        'name': 'fred',
        '_id': '7asn3'
      });
      done();
    });
  });
  
  it('gets a dog object from database', done => {
    getObject('./data', 'dogs', 'ts21j', (err, data) => {
      assert.deepEqual(data, {
        'name': 'woof',
        '_id': 'ts21j'
      });
      done();
    });
  });

});