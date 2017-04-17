const assert = require('assert');
const rimraf = require('rimraf');
const dbFactory = require('../lib/db-factory');
const fs = require('fs');

const TEST_DIR = './data';
const db = dbFactory(TEST_DIR);

describe('db', () => {
  const testCat = {
    name: 'testcat',
    type: 'best'
  };
  const testCat2 = {
    name: 'testcat2',
    type: 'worst'
  };

  before((done) => {
    db.save('cats', testCat, (err, data) => {
      if (err) return done(err);
      testCat._id = data._id;
      done();
    });
  });

  before((done) => {
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

    it('checks that we retrieve an array of the objects in the files in target directory', (done) => {
      db.getAll('bears', (err, bearsArray) => {
        if (err) return done(err);
        assert.equal(bearsArray[0].name, 'baobao');
        assert.equal(bearsArray.length, 1);
        done();
      });
    });

    it('checks that array of the objects is in in expected order', (done) => {
      const garfield = {
        name: 'garfield',
      };

      db.save('cats', garfield, err => {
        if (err) return done(err);

        db.getAll('cats', (err, catsArray) => {
          if (err) return done(err);
          assert.equal(catsArray.length, 2);
          done();
        });
      });
    });
  });

  describe('db.update', () => {

    it('checks that targeted object is hit and content was updated and saved correctly', done => {
      const tom = {
        name: 'tom',
      };

      db.save('cats', tom, (err, object) => {
        if (err) return done(err);
        tom._id = object._id;
        tom.name = 'jerry';

        db.update('cats', tom, (err, updatedObject) => {
          if (err) return done(err);
          const catObjectInFile = fs.readFileSync(`./data/cats/${tom._id}.json`);
          assert.deepEqual(JSON.parse(catObjectInFile), tom);
          assert.equal(updatedObject.name, 'jerry');
          done();
        });
      });
    });
  });

  describe('db.remove', () => {

    it('checks that function deletes targeted file', done => {
      const dutchess = {
        name: 'dutchess',
      };

      db.save('cats', dutchess, (err, object) => {
        if (err) return done(err);
        dutchess._id = object._id;

        db.remove('cats', object._id, (err, removed) => {
          if (err) return done(err);

          db.getAll('cats', (err, catsArray) => {
            if (err) return done(err);
            assert.equal(catsArray.length, 3);
            assert.ok(removed);
            done();
          });
        });
      });
    });

    it('checks that function deletes a different file', done => {
      const pauli = {
        name: 'pauli',
      };

      db.save('bears', pauli, (err, object) => {
        if (err) return done(err);
        pauli._id = object._id;

        db.remove('bears', object._id, (err, removed) => {
          if (err) return done(err);

          db.getAll('bears', (err, bearsArray) => {
            if (err) return done(err);
            assert.equal(bearsArray.length, 1);
            assert.ok(removed);
            done();
          });
        });
      });
    });
  });
});