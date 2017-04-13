const assert = require('assert');
const rimraf = require('rimraf');
const SimpleDb = require('../lib/simple-db');

const ROOT_DIR = './data';
const db = new SimpleDb(ROOT_DIR);
const fluffy = {
  name: 'fluffy',
  type: 'maine coon' };
const swifty = {
  name: 'swifty',
  type: 'tabby' };

describe('db', () => {

  before(done => {
    rimraf(ROOT_DIR, err => {
      done(err);
    });
  });

  before(done => {
    db.save('cats', fluffy, (err, data) => {
      if (err) return done(err);
      fluffy._id = data._id;
      done();
    });
  });

  before(done => {
    db.save('cats', swifty, (err, data) => {
      if (err) return done(err);
      swifty._id = data._id;
      done();
    });
  });

  describe('db.save', () => {

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

  describe('db.get', () => {

    it('gets a cat given an id', done => {
      const id = fluffy._id;
      db.get('cats', id, (err, cat) => {
        assert.equal(cat._id, fluffy._id);
        assert.equal(cat.name, fluffy.name);
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

  describe('db.getAll', () => {

    it('gets all objects in rootDir, returns array', done => {
      db.getAll('cats', (err, cats) => {
        if (err) return done(err);
        assert.equal(cats.length, 3);
        done();
      });
    });

  });
});
