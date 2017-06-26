const fs = require('fs');
const assert = require('assert');
const getObject = require('../lib/db');

describe('get object', () => {

  it('gets a cat given an id', done => {
    getObject('./data', 'cats', 'f1de5', (err, data) => {
      assert.deepEqual(data, {
        'name': 'fluffy',
        '_id': 'f1de5'
      });
      done();
    });
  });

  it('gets a cat given an id', done => {
    getObject('./data', 'cats', 'meow', (err, data) => {
      assert.deepEqual(data, {
        'name': 'garfield',
        '_id': 'meow'
      });
      done();
    });
  });

  it('gets a dog given an id', done => {
    getObject('./data', 'dogs', 'ruff', (err, data) => {
      assert.deepEqual(data, {
        'name': 'fido',
        '_id': 'ruff'
      });
      done();
    });
  });

  it('gets a dog given an id', done => {
    getObject('./data', 'dogs', 'arf', (err, data) => {
      assert.deepEqual(data, {
        'name': 'patrick',
        '_id': 'arf'
      });
      done();
    });
  });

  it('returns null when cant find object by id ', done => {
    getObject('./data', 'cats', 'doesnotexist', (err, data) => {
      assert.equal(data, null);
      done();
    });
  });
});