const fs = require('fs');
const assert = require('assert');
const getObject = require('../lib/db');

describe('get object', () => {
    it('gets an object given an id', done => {
        //this is our callback: (err,data) =>
        getObject('./data', 'cats', 'f1de5', (err,data) => {
            assert.deepEqual(data, {
                'name': 'fluffy',
                '_id': 'f1de5'
            });
            done();
        });  
    });
    it('returns null when can\'t find object by id', done => {
        getObject('./data', 'cats', 'doesnotexist', (err, data)=> {
            assert.equal(data, null);
            //you must call done within the async function, within assert.equal
            done();
        });
    });

});




