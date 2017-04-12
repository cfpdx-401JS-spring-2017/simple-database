const fs = require('fs');
const assert = require('assert');
const getObject = require('../lib/db');

describe('get object', () => {
    it('reads a file', done => {
        getObject('./data', 'cats', 'hood', (err, data) => {
            assert.deepEqual(data, {'name': 'street', 'id': 'hood'});
            done();
        });  
    });
    it('reads a file', done => {
        getObject('./data', 'cats', 'nono', (err, data) => {
            assert.deepEqual(data, {'name': 'billy', 'id': 'nono'});
            done();
        });  
    });
    it('reads a file', done => {
        getObject('./data', 'dogs', 'hood', (err, data) => {
            assert.deepEqual(data, {'name': 'street', 'id': 'hood'});
            done();
        });  
    });
    it('reads a file', done => {
        getObject('./data', 'dogs', 'nono', (err, data) => {
            assert.deepEqual(data, {'name': 'billy', 'id': 'nono'});
            done();
        });  
    });
    it('returns null when cant find object by id ', done => {
        getObject('./data', 'cats', 'doesnotexist', (err, data) => {
            assert.equal(data, null);
            done();
        });
    });

});