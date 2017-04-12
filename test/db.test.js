const assert = require('assert');
const shortid = require('shortid');
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
    it('saves a cat', done => {
      const id = shortid.generate();
      const newCat = {
        _id: id,
        name: 'Tom'
      };
      db.save('cats', newCat, (err, cat) => {
        //
        assert.equal(cat, {});
        done();
      });
    });
  });

});
