const assert = require('assert');
const rimraf = require('rimraf');
const dbFactory = require('../lib/db-factory');
const fsp = require('fs-promise');

const TEST_DIR = './data';
const db = dbFactory(TEST_DIR);
const testCat = {
  name: 'testcat',
  type: 'best'
};
const testCat2 = {
  name: 'testcat2',
  type: 'worst'
};
const maru = {
  name: 'maru',
  type: 'scottish fold'
};

function rimrafp() {
  return new Promise((resolve, reject) => {
    rimraf(TEST_DIR, err => err ? reject(err) : resolve());
  });
}


describe('db', () => {

  before(() => {
    return db.save('cats', testCat)
      .then(cat => testCat._id = cat._id)
      .catch(err => {
        throw new Error(err);
      });
  });

  before(() => {
    return db.save('cats', testCat2)
      .then(cat => testCat2._id = cat._id);
  });

  describe('db.get()', () => {

    it('returns null when no object with that id is found', () => {
      return db.get('dogs', 'wrong')
        .then(dog => {
          assert.equal(dog, null);
        });
    });

    it('gets a cat given an id', () => {
      return db.get('cats', testCat._id)
        .then(cat => {
          assert.equal(cat.name, testCat.name);
          assert.equal(cat._id, testCat._id);
        });
    });

    it('gets a cat given different id', () => {
      return db.get('cats', testCat2._id)
        .then(cat => assert.equal(cat._id, testCat2._id));
    });
  });

  describe('db.save', () => {

    before(() => rimrafp(TEST_DIR));

    it('saves the data into a file and returns the object with a new id', () => {

      return db.save('cats', maru)
        .then((cat) => {
          assert.equal(cat.name, maru.name);
          assert.ok(cat._id);
        });
    });

    it('creates a directory if it doesn\'t exist', () => {
      const baobao = { name: 'baobao', type: 'panda' };

      return db.save('bears', baobao)
        .then((bear) => {
          db.get('bears', bear._id);
          assert.equal(bear.name, baobao.name);
        });
    });
  });
});

describe('db.getAll', () => {

  it('gets all objects, returns an array', () => {
    return db.getAll('cats')
      .then(cats => {
        assert.equal(cats.length, 1);
      });
  });

  it('checks that we retrieve an array of the objects in the files in target directory', () => {
    return db.getAll('bears')
      .then((bearsArray) => {
        assert.equal(bearsArray[0].name, 'baobao');
        assert.equal(bearsArray.length, 1);
      });
  });
});

describe('db.update', () => {

  it('checks that targeted object is hit and content was updated and saved correctly',
    () => {
      maru.name = 'new name';

      return db.update('cats', maru)
        .then(() => {
          return db.get('cats', maru._id)
            .then(updated => {
              assert.deepEqual(updated.name, 'new name');
            });
        });
    });
});

describe('db.remove', () => {

  it('checks that function deletes targeted file', () => {
    const dutchess = {
      name: 'dutchess',
    };

    return db.save('cats', dutchess)
      .then(saved => dutchess._id = saved._id)
      .then(() => db.remove('cats', dutchess._id))
      .then(data => {
        assert.deepEqual(data, { removed: true });
        return db.getAll('cats')
        .then(cats => {
          assert.equal(cats.length, 1);
        });
      });
  });

  it.skip('returns removed false if object does not exist', () => {
    const id = 'notReal';
    return db.remove('cats', id)
      .then(data => {
        assert.deepEqual(data, { removed: false });
      });
  });
});