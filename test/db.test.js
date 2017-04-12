const assert = require('assert');
const dbFactory = require('../lib/db-factory')

const testDir = './data';
const db = dbFactory(testDir);

describe('db.get', () => {

  it('returns null when no object with that id is found', done => {
    db.get('dogs', 'wrong', (err, data) => {
      assert.deepEqual(data, null);
      done()
    });
  });

  it('gets a cat given an id', done => {
    db.get('cats', 'f1de5', (err, data) => {
      if(err) return done(err);
      assert.deepEqual(data, {
        'name': 'fluffy',
        '_id': 'f1de5'
      });
    });
    done();
  });
});