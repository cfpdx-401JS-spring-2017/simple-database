const assert = require('assert');
const dbFactory = require('../lib/db-factory.js');

const TEST_DIR = './data';
const db = dbFactory(TEST_DIR);
const rimraf = require('rimraf');

describe('db', () => {
    describe('tests for db.get', () => {
        it('gets a cat based on name', done => {
            db.get('cats', 'hood', (err, data) => {
                assert.deepEqual(data, { 'name': 'street', 'id': 'hood' });
                done();
            });
        });
        it('gets a cat based on name ', done => {
            db.get('cats', 'nono', (err, data) => {
                assert.deepEqual(data, { 'name': 'billy', 'id': 'nono' });
                done();
            });
        });
        it('gets a dog based on name ', done => {
            db.get('dogs', 'hood', (err, data) => {
                assert.deepEqual(data, { 'name': 'street', 'id': 'hood' });
                done();
            });
        });
        it('gets a dog based on name', done => {
            db.get('dogs', 'nono', (err, data) => {
                assert.deepEqual(data, { 'name': 'billy', 'id': 'nono' });
                done();
            });
        });
        it('returns null when cant find object by id ', done => {
            db.get('cats', 'doesnotexist', (err, data) => {
                assert.equal(data, null);
                done();
            });
        });
    });

    describe('db.save', () => {
        
        before((done) => {
            rimraf('./data/bears', err => {
                if(err) return done(err);
                done(err);
            });
        });
        it('saves the data into a file and returns the object with a new ID', done => {
            const maru = {name: 'maru', type: 'scottish fold'};
            db.save('cats', maru, (err, cat) => {
                if(err) return done(err);
                assert.equal(cat.name, maru.name);
                assert.ok(cat._id);
                done();
            });
        });

        it('creates a directory if it doesnotexist', done => {
            const baobao = {name: 'baobao', type: 'panda'};
            db.save('bears', baobao, (err, data) => {
                if(err) return done(err);
                db.get('bears', data._id, (err, bear) => {
                    if(err) return done(err);
                    assert.equal(bear.name, baobao.name);
                    done();
                });
            });
        });
    });
    describe('tests for db.getAll', () => {
        it('returns array of all objects from the requested table', done => {
            db.getAll('cats', (err, cats) => {
                if(err) return done(err);
                assert.equal(cats.length, 3);
                done();
            });
        });
    });
});
