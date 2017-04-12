const assert = require('assert');
const SimpleDb = require('../lib/simple-db');

const TEST_DIR = './data';
const db = new SimpleDb(TEST_DIR);

describe('get object', () => {
  it('gets a cat given an id', done => {
    const id = 'f1de5';
    db.get('cats', id, (err, cat) => {
      assert.equal(cat._id, id);
      assert.equal(cat.name, 'fluffy');
      done();
    });
  });

  it('gets a dog given an id', done => {
    db.get('dogs', 'l33t0', (err, data) => {
      assert.deepEqual(data, {
        '_id': 'l33t0',
        'name': 'bowwow'
      });
      done();
    });
  });

  it('returns null when can\'t find object by id', done => {
    db.get('cats', 'doesnotexist', (err, data) => {
      assert.equal(data, null);
      done();
    });
  });

  // // it('saves', done => {
  // //   const cat = {
  // //     name: 'Tom',
  // //     _id:
  // //   }
  // // })
});