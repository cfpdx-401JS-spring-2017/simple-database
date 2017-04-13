const assert = require('assert');
const rimraf = require('rimraf');
const dbFactory = require('../lib/db-factory');

const TEST_DIR = './data';
const testCat = {
  name: 'testcat',
  type: 'best'
};
const testCat2 = {
  name: 'testcat2',
  type: 'worst'
};
const db = dbFactory(TEST_DIR);

describe('db', () => {

  before((done) => {
    db.save('cats', testCat, (err, data) => {
      if (err) return done(err);
      testCat._id = data._id;
    });
    db.save('cats', testCat2, (err, data) => {
      if (err) return done(err);
      testCat2._id = data._id;
      done();
    });
  });

  describe('db.get()', () => {

    it('returns null when no object with that id is found', done => {
      db.get('dogs', 'wrong', (err, data) => {
        assert.deepEqual(data, null);
        done();
      });
    });

    it('gets an cat given an id', done => {
      db.get('cats', testCat._id, (err, data) => {
        if (err) return done(err);
        assert.equal(data.name, testCat.name);
        assert.equal(data._id, testCat._id);
        done();
      });
    });

    it('gets a cat given different id', done => {
      db.get('cats', testCat2._id, (err, data) => {
        if (err) return done(err);
        assert.equal(data._id, testCat2._id);
        done();
      });
    });
  });

  describe('db.save', () => {

    before((done) => {
      rimraf(TEST_DIR, err => {
        done(err);
      });
    });

    it('saves the data into a file and returns the object with a new id', (done) => {
      const maru = {
        name: 'maru',
        type: 'scottish fold'
      };
      db.save('cats', maru, (err, cat) => {
        if (err) return done(err);
        assert.equal(cat.name, maru.name);
        assert.ok(cat._id);
        done();
      });
    });
    it('creates a directory if it doesn\'t exist', (done) => {
      const baobao = { name: 'baobao', type: 'panda' };
      db.save('bears', baobao, (err, data) => {
        if (err) return done(err);
        db.get('bears', data._id, (err, bear) => {
          if (err) return done(err);
          assert.equal(bear.name, baobao.name);
          done();
        });
      });
    });
  });

  describe('db.getAll', () => {

    // it('checks that we retrieve an array when there are no files in a table', (done) => {
    //   const bearArray = [];
    //   db.getAll('./bears', (err, bears) => {
    //     if(err) return done(err);
    //     assert.equal(bears, bearArray);
    //     done();
    //   });
    // });
  });
});

