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

function rimrafP() {
  return new Promise((resolve, reject) => {
    rimraf(ROOT_DIR, err => err? reject(err): resolve());
  });
}

describe('db', () => {

  before(() => { return rimrafP(ROOT_DIR); });

  before(() => {
    return db.save('cats', fluffy)
    .then(cat => {
      fluffy._id = cat._id;
    })
    .catch(err => {
      throw new Error(err);
    });
  });

  before(() => {
    return db.save('cats', swifty)
      .then(cat => {
        swifty._id = cat._id;
      });
  });

  before(() => {
    return db.save('bears', gongfucha)
      .then(data => {
        gongfucha._id = data._id;
      });
  });

  describe('db.save', () => {

    it('saves a cat and returns file with new id', () => {
      const maru = {
        name: 'maru',
        type: 'scottish fold'
      };
      return db.save('cats', maru)
      .then(cat => {
        assert.equal(cat.name, maru.name);
        assert.ok(cat._id);
      });
    });

    it('creates directory if it doesn\'t exist', () => {
      const baobao = {name: 'baobao', type: 'panda'};
      return db.save('bears', baobao)
      .then(bear => {
        db.get('bears', bear._id)
        .then(bear => {
          assert.equal(bear.name, baobao.name);
        });
      });
    });
  });

  describe('db.get', () => {

    it('gets a cat given an id', () => {
      const id = fluffy._id;
      return db.get('cats', id)
        .then(cat => {
          assert.equal(cat._id, fluffy._id);
          assert.equal(cat.name, fluffy.name);
        });
    });

    it('returns null when can\'t find object by id', () => {
      return db.get('cats', 'doesnotexist')
      .then(data => {
        assert.equal(data, null);
      });
    });
  });

  describe('db.getAll', () => {

    it('gets all objects in rootDir, returns array', () => {
      return db.getAll('cats')
        .then(cats => {
          assert.equal(cats.length, 3);
        });
    });

  });

  describe('db.remove', () => {

    it('removes an object from a directory', () => {
      const id = swifty._id;
      db.remove('cats', id)
      .then(data => {
        assert.deepEqual(data, { removed: true });
      });
    });

    it('returns if object does not exist', () => {
      const id = 'doesnotexist';
      return db.remove('cats', id)
      .then(data => {
        assert.equal(data, { removed: false });
      });
    });
  });

  describe('db.update', () => {
    
    it('updates and returns an object', () => {
      const obj = gongfucha;
      gongfucha.type = 'red panda';
      const id = gongfucha._id;
      return db.update('bears', obj)
      .then(() => {
        return db.get('bears', id)
        .then(update => {
          assert.equal(update.type, 'red panda');
        });
      });
    });

    it('returns error if object does not exist', () => {
      const obj = {
        name: 'not real',
        type: 'imaginary' 
      };
      return db.update('bears', obj)
      .then(err => {
        assert.ok(err, 'Error: Object does not exist.');
      });
    });
  });

});
