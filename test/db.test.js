const assert = require('assert');
const rimraf = require('rimraf');
const dbFactory = require('../lib/db-factory');
const fs = require('fs');

const TEST_DIR = './data';
const db = dbFactory(TEST_DIR);

function rimrafp() {
  return new Promise((resolve, reject) => {
    rimraf(TEST_DIR, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

describe('db', () => {
  const testCat = {
    name: 'testcat',
    type: 'best'
  };
  const testCat2 = {
    name: 'testcat2',
    type: 'worst'
  };

  before(() => {
    return db.save('cats', testCat)
      .then(cat => testCat._id = cat._id);
  });

  before(() => {
    return db.save('cats', testCat2)
      .then(cat => testCat2._id = cat._id);
  });

  describe('db.get()', () => {

    it('returns null when no object with that id is found', () => {
      return db.get('dogs', 'wrong')
        .then((dog) => {
          assert.deepEqual(dog, null);
        });
    });

    it('gets an cat given an id', () => {
      return db.get('cats', testCat._id)
        .then((cat) => {
          assert.equal(cat.name, testCat.name);
          assert.equal(cat._id, testCat._id);
        });
    });

    it('gets a cat given different id', () => {
      return db.get('cats', testCat2._id)
        .then((cat) => {
          assert.equal(cat._id, testCat2._id);
        });
    });
  });

  describe('db.save', () => {

    before(() => rimrafp(TEST_DIR));

    it('saves the data into a file and returns the object with a new id', () => {
      const maru = {
        name: 'maru',
        type: 'scottish fold'
      };

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

  it('checks that we retrieve an array of the objects in the files in target directory', () => {
    return db.getAll('bears')
      .then((bearsArray) => {
        assert.equal(bearsArray[0].name, 'baobao');
        assert.equal(bearsArray.length, 1);
      });
  });

  it('checks that array of the objects is in in expected order', () => {
    const garfield = {
      name: 'garfield',
    };
    return db.save('cats', garfield)
      .then(() => db.getAll('cats'))
      .then((catsArray) => {
        assert.equal(catsArray.length, 2);
      });
  });
});

describe('db.update', () => {

  it('checks that targeted object is hit and content was updated and saved correctly', () => {
    const tom = {
      name: 'tom',
    };

    return db.save('cats', tom)
      .then((cat) => {
        tom._id = cat._id;
        tom.name = 'jerry';
        db.update('cats', tom);
      })
      .then((tom) => {
        const catObjectInFile = fs.readFileSync(`./data/cats/${tom._id}.json`);
        assert.deepEqual(JSON.parse(catObjectInFile), tom);
        assert.equal(catObjectInFile.name, 'jerry');
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