const fs = require('fs');
const assert = require('assert');
const getObject = require('../lib/db');

describe('get object', () => {
    it('gets a cat given an id', done => {
        getObject('./data', 'cats', 'f1de5', (err, data) => {
            assert.deepEqual(data, {'name': 'fluffy', '_id': 'f1de5'});
            done();
        });
    });
    it('returns null when cant find object by id', done => {
        getObject('./data', 'cats', 'donesnotexist', (err, data) => {
            assert.equal(data, null);
            done();
        });
    });
});
