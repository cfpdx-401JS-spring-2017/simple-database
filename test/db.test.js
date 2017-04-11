const fs = require('fs');
const assert = require('assert');

describe('get object', () => {
    it('reads a file', done => {
        fs.readFile('./data/cats/fluffy.json', (err, data) => {
            //use deepequal to compare the guts of an object
            //use json.parse to turn stringified object back into reg obj
            const jsonData = JSON.parse(data);
            assert.deepEqual(jsonData, {'name':'fluffy'});
            done();
        });

        console.log('hello, or something silly');
    });
});


