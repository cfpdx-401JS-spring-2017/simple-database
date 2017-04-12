const fs = require('fs');
const assert = require('assert');
const dbFactory = require('../lib/db-factory');

const TEST_DIR = './data';
const db = dbFactory(TEST_DIR);

describe('db.get', () => {
    it('gets a cat given an id', done => {
        db.get('cats', 'f1de5', (err, data) => {
            assert.deepEqual(data, {'name': 'fluffy', '_id': 'f1de5'});
            done();
        });
    });
    
    it('gets a cat given an id', done => {
        db.get('cats', 'otherCat', (err, data) => {
            assert.deepEqual(data, {'name': 'Kitty', '_id': 'catID'});
            done();
        });
    });

    it('gets a dog given an id', done => {
        db.get('dogs', 'woof', (err, data) => {
            assert.deepEqual(data, {'name': 'sophie', '_id': 'dogID'});
            done();
        });
    });

    it('gets a dog given an id', done => {
        db.get('dogs', 'bark', (err, data) => {
            assert.deepEqual(data, {'name': 'doggo', '_id': 'pupID'});
            done();
        });
    });

    it('returns null when cant find object by id', done => {
        db.get('cats', 'donesnotexist', (err, data) => {
            assert.equal(data, null);
            done();
        });
    });

});
