const fs = require('fs');
const assert = require('assert');
const getObject = require('../lib/db');

describe('get object', () => {
    it('reads a file', done => {
        getObject('./data', 'cats', 'hood', (err, data) => {
            assert.deepEqual(data, {'name': 'street', 'id': 'hood'});
        });
        done();
    });

});