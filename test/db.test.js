const assert = require('assert');
const dbFactory = require('../lib/db-factory.js');
const fs = require('fs');
const path = require('path');
const TEST_DIR = './data';
const db = dbFactory(TEST_DIR);
const rimraf = require('rimraf');
let baobao = {name: 'baobao', type: 'panda'};

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
                done();
            });
        });
        it('saves the data into a file and returns the object with a new ID', done => {
            const maru = {name: 'maru', type: 'scottish fold'};
            db.save('cats', maru, (err, cat) => {
                if(err) return done(err);
                assert.equal(cat.name, maru.name);
                assert.ok(cat._id);
                rimraf('./data/cats/' + cat._id + '.json', err => {
                    if(err) return done(err);
                    done();
                });
            });
        });

        it('creates a directory if it doesnotexist', done => {
            db.save('bears', baobao, (err, data) => {
                if(err) return done(err);
                db.get('bears', data._id, (err, bear) => {
                    if(err) return done(err);
                    baobao._id = bear._id;
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
                assert.equal(cats.length, 2);
                done();
            });
        });
    });
    describe('tests for empty array', () => {
        // before((done) => {
        //     rimraf('./data/dolphins', err => {
        //         if(err) return done(err);
        //         done(err);
        //     });
        // });
        it('returns an empty array if the requested table is empty', done => {
            db.getAll('dolphins', (err, dolphins) => {
                if(err) return done(err);
                assert.equal(dolphins.length, 0);
                done();
            });
        });
    });

    describe('updates object and saves the changes', () => {

        it('updates an object and returns the updated object', done => {
            baobao.name = 'Winnie the Pooh';
            db.update('bears', baobao, (err, bear) => {
                if(err) return done(err);
                assert.equal(bear.name, 'Winnie the Pooh');
                done();
            });
        });

        it('returns error no property found if _id is not a property on object', done => {
            var newCat = {};
            newCat.name = 'omally';
            db.update('cats', newCat, (err) => {
                if(!err) return done(err);
                assert.equal(err, 'Error: Expected object to have an _id property');
                done();
            });
        });
    }); 

    describe('removes the object from the requested table that has that id', () => {

        it('return { removed: true } if the object was removed', done => {

            db.remove('bears', baobao._id, (err, bear) => {
                if(err) return done(err);
                const filePath = path.join(TEST_DIR, 'bears');
                fs.readdir(filePath, function (err, files){
                    assert.deepEqual(bear, { removed: true });
                    assert.deepEqual(files, []);
                    done();
                });
            });
        });

        it('return { removed: false } if the object was not removed', done => {
            db.remove('cats', 'omally', (err, cat) => {
                if(err) return done(err);
                assert.deepEqual(cat, { removed: false });
                done();
            });
        });
    });
});
