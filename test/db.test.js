const assert = require('assert');
const dbFactory = require('../lib/db-factory');

const testDir = './data';
const db = dbFactory(testDir);

describe('db.get', () => {

  it('returns null when no object with that id is found', done => {
    db.get('dogs', 'wrong', (err, data) => {
      assert.deepEqual(data, null);
      done();
    });
  });

  it('gets a cat given an id', done => {
    db.get('cats', 'f1de5', (err, data) => {
      if (err) return done(err);
      assert.deepEqual(data, {
        'name': 'fluffy',
        '_id': 'f1de5'
      });
    });
    done();
  });

  describe('db.save', () => {
    it('saves data into a file and returns object with new id', (done) => {
      const maru = {
        name: 'Maru',
        type: 'scottish fold'
      };
      db.save('cats', maru, (err, cat) => {
        if (err) return done(err);
        assert.equal(cat.name, maru.name);
        assert.ok(cat._id);
        done();
      });
    });
    it('creates a directory if it does not exist', () => {
      const baobao = {name: 'baobao', type: 'panda'};
      db.save('bears', baobao, (err, data) => {
        if(err) return done(err);
        db.get('bears', data._id, (err, bear) => {
          if(err) return done(err);
          assert.equal(bear.name, baobao.name);
          done();
        });
      });
    });
  });
});
