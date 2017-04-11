const fs = require('fs');
const assert = require('assert');
const getObj = require('../lab');

describe('get object', () => {
  
  it('reads a file', done => {
    fs.readFile('./data/fluffy.json', (err, data) => {
      const jsonData = JSON.parse(data);
      assert.deepEqual(jsonData, {'name': 'fluffy'});
      done();
    });
    console.log('hello');
  });
  
  it('gets data from dogs', () => {
    //
  });

});