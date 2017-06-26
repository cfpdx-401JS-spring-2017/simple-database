const assert = require('assert');
const dbFactory = require('../lib/db-factory');
const rimraf = require('rimraf');

const testDir = './data';
const db = dbFactory(testDir);

const felix = { name: 'felix', type: 'stripey' };
const garfield = { name: 'garfield', type: 'lazagna-lover' };


describe('db', () => {

  before(done => {
    rimraf(testDir, err => {
      done(err);
    });
  });

  before(done => {
    db.save('cats', felix, (err, data) => {
      if (err) return done(err);
      felix._id = data._id;
      done();
    });
  });

  before(done => {
    db.save('cats', garfield, (err, data) => {
      if (err) return done(err);
      garfield._id = data._id;
      done();
    });
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

    it('creates a directory if it does not exist', done => {
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

  describe('db.get', () => {

    it('gets a cat given an id', done => {
      const id = garfield._id;
      db.get('cats', id, (err, cat) => {
        assert.equal(cat._id, garfield._id);
        assert.equal(cat.name, garfield.name);
      });
      done();
    });

    it('returns null when no object with that id is found', done => {
      db.get('dogs', 'wrong', (err, data) => {
        assert.deepEqual(data, null);
        done();
      });
    });
  });

  describe('db.getAll', () => {

    it('gets all objects in testDir, returns array', done => {
      db.getAll('cats', (err, cats) => {
        if (err) return done(err);
        assert.equal(cats.length, 3);
        done();
      });
    });
  });

  describe('db.remove', () => {

    it('removes an object from a directory', done => {
      const id = garfield._id;
      db.remove('cats', id, (err, data) => {
        if (err) return done(err);
        assert.equal(data, { removed: true });
      });
      done();
    });

    it('returns if object does not exist', done => {
      const id = 'doesnotexist';
      db.remove('cats', id, (err, data) => {
        if (!err) return done(err);
        assert.equal(data, { removed: false });
        done();
      });
    });
  });

  describe('db.update', () => {

    it('saves the provided object as a new file', done => {
      felix.testProp = true;
      db.update('cats', felix, (err, cat) => {
        if (err) return done(err);
        assert.equal(cat.testProp, true);
        done();
      });
    });

    it('should return the object that was updated', done => {
      db.update('cats', felix, (err, cat) => {
        if (err) return done(err);
        assert.deepEqual(cat, felix);
        done();
      });
    });
  });
});