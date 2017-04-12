const fs = require('fs');
const assert = require('assert');
const getObject = require('../lib/db');
const dbFactory = require('../lib/db-factory.js');

const TEST_DIR  = './data';
const db = dbFactory(TEST_DIR);

describe('tests for db.get', () => {
    it('gets a cat based on name' , done => {
        db.get('cats', 'hood', (err, data) => {
            assert.deepEqual(data, { 'name': 'street', 'id': 'hood' });
            done();
        });  
    });
    it('gets a cat based on name ', done => {
        db.get('cats', 'nono', (err, data) => {
            assert.deepEqual(data, {'name': 'billy', 'id': 'nono'});
            done();
        });  
    });
    it('gets a dog based on name ', done => {
        db.get('dogs', 'hood', (err, data) => {
            assert.deepEqual(data, {'name': 'street', 'id': 'hood'});
            done();
        });  
    });
    it('gets a dog based on name', done => {
        db.get('dogs', 'nono', (err, data) => {
            assert.deepEqual(data, {'name': 'billy', 'id': 'nono'});
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