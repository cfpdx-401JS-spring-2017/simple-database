const fs = require('fs');
const assert = require('assert');
const getObj = require('../lab');

describe('get object', () => {
  
  it('reads a file', done => {
    fs.readFile('./data/test.txt', (err, data) => {
      assert.equal(data, 'test');
      done();
    });
    console.log('hello');
  });
  
  it('gets data from dogs', () => {
    //
  });

});