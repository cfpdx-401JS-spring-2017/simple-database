const fs = require('fs');
const assert = require('assert');

describe('get object', () => {
    it('reads a file', done => {
        fs.readFile('./data/hood.json', (err, data) => {
            const jsonData = JSON.parse(data);
            assert.deepEqual(jsonData, {'name': 'street'});
            done();
        });
        console.log('hello');
    });

});