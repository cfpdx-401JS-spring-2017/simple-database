const fs = require('fs');
const assert = require('assert');
const getObject = require('../lib/lab');

describe('get object', () => {

  it('gets an object given an id', done => {
    // fs.readFile('./data/cats/fluffy.json', (err, data) => {
    //   const jsonData = JSON.parse(data);
    //   assert.deepEqual(jsonData, {'name': 'fluffy'});
    //   done();
    getObject('./data', 'cats', 'f1de5', (err, data) => {
      assert.deepEqual(data, {
        '_id': 'f1de5',
        'name': 'fluffy'
      });
      done();
    });
  });
});