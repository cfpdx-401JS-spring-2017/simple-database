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
const gongfucha = {
  name: 'gongfucha',
  type: 'panda' };

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

  before(done => {
    db.save('bears', gongfucha, (err, data) => {
      if (err) return done(err);
      gongfucha._id = data._id;
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

  describe('db.remove', () => {

    it('removes an object from a directory', done => {
      const id = swifty._id;
      db.remove('cats', id, (err, data) => {
        if (err) return done(err);
        assert.deepEqual(data, { removed: true });
        done();
      });
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
    
    //TODO: Complete update function and pass test
    it('updates and returns an object', done => {
      const obj = gongfucha;
      gongfucha.type = 'red panda';
      db.update('bears', obj, (err, data) => {
        if (err) return done(err);
        assert.equal(data, 'Panda!');
        done();
      });
    });

    //TODO: Make assert equal correctly read error (we are getting the error we want)
    it('returns error if object does not exist', done => {
      const obj = {
        name: 'not real',
        type: 'imaginary' 
      };
      db.update('bears', obj, (err, data) => {
        if (!err) return done(err);
        console.log(data);
        console.log(err);
        assert.equal(err, 'Object does not exist.');
        done();
      });
    });
  });

});
