const fs = require('fs');
const assert = require('assert');
const dbFactory = require('../lib/db-factory');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');


const TEST_DIR = './data';
const db = dbFactory(TEST_DIR);


describe('db', () => {
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
    describe('db.save', () => {
        before((done) = {
            rimraf('./bears', err => {
                if(err) return done(err);
                done(err);
            });
        });
        it('saves data in new file and returns object with new id', (done) => {
            const fluffy = {name: 'fluffy',
                type: 'scotish fold'
            };
            db.save('cats', fluffy, (err, cat) => {
                if(err) return done(err);
                assert.equal(cat.name, fluffy.name);
                assert.ok(cat._id);
                done();
            });
        });
        it('creates directory is doesnt exist', (done) => {
            const boaboa = {name: 'boaboa', type: 'panda'};
            db.save('bears', boaboa, (err, data) => {
                db.get('bears', data._id, (err, bear) => {
                    if(err) return done(err);
                    assert.equal(bear.name, boaboa.name);
                    done();
                });
            });
        });
    });
    describe('db.getAll', () => {
        it('checks getting an array of files from table', (done) => {
            const bearArray = [];
            getAll('./bears', (err, bears) => {
                if(err) return done(err);
            assert.deepEqual(bear.name, boaoba.name)
            });
        });
    });
});
