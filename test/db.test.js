const assert = require('assert');
const rimraf = require('rimraf');
const dbFactory = require('../lib/db-factory');

const TEST_DIR = './data';
const db = dbFactory(TEST_DIR);

const testCat1 = { name: 'testcat1', type: 'best'};
const testCat2 = { name: 'testcat2', type: 'bestcat'};
const testCat3 = { name: 'testcat2', type: 'bestcat'};
const testDog1 = { name: 'testDog1', type: 'dawg'};
const testDog2 = { name: 'testDog2', type: 'bestdawg'};
let baobao = { name: 'baobao', type: 'panda'};

describe('db', () => {

  before(done => {
    db.save('cats', testCat1, (err, data) => {
      if (err) return done(err);
      testCat1._id = data._id;
      done();
    });
  });

  before(done => {
    db.save('cats', testCat2, (err, data) => {
      if (err) return done(err);
      testCat2._id = data._id;
      done();
    });
  });

  before(done => {
    db.save('dogs', testDog1, (err, data) => {
      if (err) return done(err);
      testDog1._id = data._id;
      done();
    });
  });

  before(done => {
    db.save('dogs', testDog2, (err, data) => {
      if (err) return done(err);
      testDog2._id = data._id;
      done();
    });
  });

  describe('db.get()', () => {

    it('gets a cat given an id', done => {
      db.get('cats', testCat1._id, (err, data) => {
        assert.equal(data.name, testCat1.name);
        assert.equal(data._id, testCat1._id);
        done();
      });
    });

    it('gets a cat given an id', done => {
      db.get('cats', testCat2._id, (err, data) => {
        assert.equal(data.name, testCat2.name);
        assert.equal(data._id, testCat2._id);
        done();
      });
    });

    it('gets a dog given an id', done => {
      db.get('dogs', testDog1._id, (err, data) => {
        assert.equal(data.name, testDog1.name);
        assert.equal(data._id, testDog1._id);
        done();
      });
    });

    it('gets a dog given an id', done => {
      db.get('dogs', testDog2._id, (err, data) => {
        assert.equal(data.name, testDog2.name);
        assert.equal(data._id, testDog2._id);
        done();
      });
    });

    it('returns null when it can\'t find an object with that id', done => {
      db.get('cats', 'doesnotexist', (err, data) => {
        assert.equal(data, null);
        done();
      });
    });
  });

  describe('db.save()', () => {

    before(done => {
      rimraf(TEST_DIR, err => {
        done(err);
      });
    });

    it('saves the data in a file and returns that object with a generated id', done => {
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

    it('creates a directory if none exists', done => {
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

  describe('db.getAll()', () => {
    it('given a directory, returns an array of objects', done => {
      db.getAll('bears', (err, bears) => {
        if (err) return done(err);
        assert.equal(bears[0].name, 'baobao');
        done();
      });
    });
  });

  describe('db.getAll()', () => {
    before(done => {
      rimraf('./data/bears/*', err => {
        done(err);
      });
    });

    it('returns empty array when directory has no contents', done => {
      db.getAll('bears', (err, bears) => {
        if (err) return done(err);
        assert.deepEqual(bears, []);
        done();
      });
    });

    after(done => {
      db.save('bears', baobao, (err, bear) => {
        if (err) return done(err);
        delete baobao._id;
        done();
      });
    });
  });

  describe('db.update()', () => {

    before(done => {
      db.save('cats', testCat3, (err, cat) => {
        if (err) return done(err);
        testCat3._id = cat._id;
        done();
      });
    });

    it('should read the id property of the object if it is found', done => {
      db.update('cats', testCat3, (err, cat) => {
        if (err) return done(err);
        assert.equal(cat, testCat3._id);
        done();
      });
    });

    it('should throw an error if object is not found', done => {
      db.update('bears', baobao, (err, bear) => {
        if (!err) return done(err);
        assert.equal(err, 'Error: Expected object to have an _id property');
        done();
      });
    });

  });

});