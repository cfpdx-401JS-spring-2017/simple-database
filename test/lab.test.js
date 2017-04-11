const fs = require('fs');
const assert = require('assert');
const getObject = require('../lib/lab');

describe('get object', () => {
  it('gets an object given an id', done => {
    getObject('./data', 'cats', 'f1de5', (err, data) => {
      console.log('THIS IS THE CALLBACK');
      assert.deepEqual(data, {
        '_id': 'f1de5',
        'name': 'fluffy'
      });
      done();
    });
  });
});