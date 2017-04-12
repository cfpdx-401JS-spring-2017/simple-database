const assert = require('assert');
const dbFactory = require('../lib/db-factory');

const TEST_DIR = './data';
const db = dbFactory(TEST_DIR);

describe('db', () => {
  describe('db.get()', () => {

    it('returns null when no object with that id is found', done => {
      db.get('dogs', 'wrong', (err, data) => {
        assert.deepEqual(data, null);
        done();
      });
    });

    it('gets an cat given an id', done => {
      db.get('cats', 'f1de5', (err, data) => {
        if (err) return done(err);
        assert.deepEqual(data, {
          'name': 'fluffy',
          '_id': 'f1de5'
        });
        done();
      });
    });

    it('gets a cat given different id', done => {
      db.get('cats', '7asn3', (err, data) => {
        assert.deepEqual(data, {
          'name': 'fred',
          '_id': '7asn3'
        });
        done();
      });
    });

    it('gets a dog given an id', done => {
      db.get('dogs', 'ts21j', (err, data) => {
        assert.deepEqual(data, {
          'name': 'woof',
          '_id': 'ts21j'
        });
        done();
      });
    });

    it('gets a dog given an id', done => {
      db.get('dogs', 'y47ad', (err, data) => {
        assert.deepEqual(data, {
          'name': 'dude',
          '_id': 'y47ad'
        });
        done();
      });
    });
  });

  describe('db.save', () => {

    it('saves the data into a file and returns the object with a new id', (done) => {
      const maru = {
        name: 'maru',
        type: 'scottish fold'
      };
      db.save('cats', maru, (err, cat) => {
        if(err) return done(err);
        assert.equal(cat.name, maru.name);
        assert.ok(cat._id);
        done(); 
      });
    });

  });

});

