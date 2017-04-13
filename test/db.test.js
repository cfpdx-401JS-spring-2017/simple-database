const assert = require('assert');
const rimraf = require('rimraf');
const SimpleDb = require('../lib/simple-db');

const ROOT_DIR = './data';
const db = new SimpleDb(ROOT_DIR);

describe('db', () => {

  describe('db.get', () => {

    it('gets a cat given an id', done => {
      const id = 'f1de5';
      db.get('cats', id, (err, cat) => {
        assert.equal(cat._id, id);
        assert.equal(cat.name, 'fluffy');
        done();
      });
    });

    it('gets a dog given an id', done => {
      const id = 'l33t0';
      db.get('dogs', id, (err, dog) => {
        assert.equal(dog._id, id);
        assert.equal(dog.name, 'bowwow');
        done();
      });
    });

    it('returns null when can\'t find object by id', done => {
      db.get('cats', 'doesnotexist', (err, data) => {
        assert.equal(data, null);
        done();
      });
    });
  });
  
  describe('db.save', () => {

    before (done => {
      rimraf('./data/bears', err => {
        done(err);
      });
    });

    it('saves a cat and returns file with new id', done => {
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

    it('creates directory if it doesn\'t exist', done => {
      const baobao = {name: 'baobao', type: 'panda'};
      db.save('bears', baobao, (err, bear) => {
        if(err) return done(err);
        db.get('bears', bear._id, (err, bear) => {
          if (err) return done(err);
          assert.equal(bear.name, baobao.name);
          done();
        });
      });
    });
  });

  describe('db.getAll', () => {

    it('gets all objects in rootDir, returns array', done => {
      db.getAll('cats', (err, catsArray) => {
        if (err) return done(err);
        const jsonCats = JSON.parse(catsArray[0]);
        assert.equal(jsonCats.name, 'fluffy');
        done();
      });
    });

  });

});
