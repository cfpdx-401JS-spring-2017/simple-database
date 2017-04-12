
const assert = require('assert');
const dbFactory = require('../lib/db-factory');

const TEST_DIR = './data';
const db = dbFactory(TEST_DIR);

describe('db', () => {
    describe('db.get()', () => {

        it('returns null when can\'t find object by id', done => {
            db.get('cats', 'doesnotexist', (err, data) => {
                assert.equal(data, null);
                //you must call done within the async function, within assert.equal
                done();
            });
        });

        it('gets a cat object given an id', done => {
            db.get('cats', 'f1de5', (err, data) => {
                assert.deepEqual(data, {
                    'name': 'fluffy',
                    '_id': 'f1de5'
                });
                done();
            });
        });

        it('gets a 2nd cat object given an id', done => {
            db.get('cats', 'oxe34', (err, data) => {
                assert.deepEqual(data, {
                    'name': 'ada',
                    '_id': 'oxe34'
                });
                done();
            });
        });
        it('gets a dog object given an id', done => {
            db.get('dogs', '6ht7u', (err, data) => {
                assert.deepEqual(data, {
                    'name': 'beau',
                    '_id': '6ht7u'
                });
                done();
            });
        });
        it('gets a 2nd dog object given an id', done => {
            db.get('dogs', 't33t0', (err, data) => {
                assert.deepEqual(data, {
                    'name': 'lp',
                    '_id': 't33t0'
                });
                done();
            });
        });

    });
});

describe('db.save', () => {
    it.only('saves the data into a file and returns the object with a new id', (done) => {
        const maru = {
            name: 'maru',
            type: 'scottish fold'
        };
        //data in this callback = cat
        db.save('cats', maru, (err, cat) => {
            if(err) return done (err);
            assert.equal(cat.name, maru.name);
            //assert.ok checks that something is present, makes sure that we have have an id
            assert.ok(cat._id);
            done();
        });
    });
});







