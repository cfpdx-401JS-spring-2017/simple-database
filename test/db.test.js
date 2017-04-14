
const assert = require('assert');
const rimraf = require('rimraf');
const fs = require('fs');
const dbFactory = require('../lib/db-factory');
const TEST_DIR = './data';



const db = dbFactory(TEST_DIR);


//create mock animal objects to pass into our tests for the save function in db-factory.js
const testCat = { name: 'testCat', type: 'best' };
const testCat2 = { name: 'testCat2', type: '2ndbest' };
const testDog = { name: 'testDog', type: 'bestDog' };
const testDog2 = { name: 'testDog2', type: '2ndBestDog' };
const maru = { name: 'maru', type: 'scottish fold' };

describe('db', () => {

    //QUESTION: why do we write these db.save hooks here instead of in the db.save require?
    before((done) => {
        db.save('cats', testCat, (err, data) => {
            if (err) return done(err);
            testCat._id = data._id;
            done();
        });
    });
    before((done) => {
        db.save('cats', testCat2, (err, data) => {
            if (err) return done(err);
            testCat2._id = data._id;
            done();
        });
    });

    before((done) => {
        db.save('dogs', testDog, (err, data) => {
            if (err) return done(err);
            testDog._id = data._id;
            done();
        });
    });

    before((done) => {
        db.save('dogs', testDog2, (err, data) => {
            if (err) return done(err);
            testDog2._id = data._id;
            done();
        });
    });

    describe('db.get()', () => {

        it('returns null when can\'t find object by id', done => {
            db.get('cats', 'doesnotexist', (err, data) => {
                assert.equal(data, null);
                //you must call done within the async function, within assert.equal
                done();
            });
        });

        it('gets a cat object given an id', done => {
            db.get('cats', testCat._id, (err, data) => {
                if (err) return done(err);
                assert.equal(data.name, testCat.name);
                assert.equal(data._id, testCat._id);
                done();
            });
        });

        it('gets a 2nd cat object given an id', done => {
            db.get('cats', testCat2._id, (err, data) => {
                if (err) return done(err);
                assert.equal(data.name, testCat2.name);
                assert.equal(data._id, testCat2._id);
                done();
            });
        });

        it('gets a dog object given an id', done => {
            db.get('dogs', testDog._id, (err, data) => {
                if (err) return done(err);
                assert.equal(data.name, testDog.name);
                assert.equal(data._id, testDog._id);
                done();
            });
        });

        it('gets a 2nd dog object given an id', done => {
            db.get('dogs', testDog2._id, (err, data) => {
                if (err) return done(err);
                assert.equal(data.name, testDog2.name);
                assert.equal(data._id, testDog2._id);
                done();
            });
        });

        describe('db.save', () => {

            before((done) => {
                rimraf(TEST_DIR, () => {
                    done();
                });
            });

            it('saves the data into a file and returns the object with a new id', (done) => {

                //data in this callback = cat
                db.save('cats', maru, (err, cat) => {
                    if (err) return done(err);
                    assert.equal(cat.name, maru.name);
                    //assert.ok checks that something is present, makes sure that we have have an id
                    assert.ok(cat._id);
                    done();
                });
            });

            it('creates a directory if it doesn\'t exist', (done) => {
                const baobao = { name: 'baobao', type: 'panda' };

                db.save('bears', baobao, (err, data) => {
                    if (err) return done(err);
                    //QUESTION: why do we use .get as a means to test .save?
                    db.get('bears', data._id, (err, data) => { //data here could also be bear
                        if (err) return done(err);
                        assert.equal(data.name, baobao.name);
                        done();
                    });

                });
            });
        });

        describe('db.getAll', () => {


            it('returns an array of all objects from requested table', (done) => {
                db.getAll('bears', (err, bearsArray) => {
                    assert.equal(bearsArray[0].name, 'baobao');
                    done();
                });
            });

            describe('db.getAll.EmptyArray', () => {

                before((done) => {
                    rimraf(`${TEST_DIR}/bears/*`, () => {
                        done();
                    });
                });
                it('returns empty array when no objects exist', done => {
                    db.getAll('bears', (err, data) => {
                        assert.deepEqual(data, []);
                        done();
                    });

                });
            });

        });
        describe('db.update', () => {

            it('reads _id property from the object and saves it with ID as file name', done => {
                maru.name = 'buster';
                db.update('cats', maru, (err, data) => {
                    assert.equal(data._id, maru._id);
                    const updatedObject = fs.readFileSync(`${TEST_DIR}/cats/${maru._id}.json`, 'utf8');
                    assert.equal(JSON.parse(updatedObject).name, 'buster');
                    done();
                });

            });


            it('returns an error if no id is found', done => {
                delete maru._id;
                db.update('cats', maru, (err, data) => {
                    assert.equal(err, 'Error: expected to have an _id proprty');
                    done();
                });

            });

        });

        describe('db.remove', () => {

            before((done) => {
                db.save('cats', testCat, (err, data) => {
                    if (err) return done(err);
                    testCat._id = data._id;
                    done();
                });
            });
            it('when removed it returns an object with the property true ', done => {
                db.remove('cats', testCat._id, (err, data) => {
                    assert.deepEqual(data, { removed: true });
                    done();
                });

            });
            it('when no matching ID it returns an object with the property false ', done => {
                db.remove('cats', 485967, (err) => {
                    assert.deepEqual(err, { removed: false });
                    done();
                });

            });
        });

    });

});


// in order to make a directory that doesn't exist we mkdirp





