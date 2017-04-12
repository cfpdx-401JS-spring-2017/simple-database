const fs = require('fs');
const assert = require('assert');
const getObject = require('../lib/db');

describe('get object', () => {
    it('gets a cat object given an id', done => {
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

    it('gets a 2nd cat object given an id', done => {
        getObject('./data', 'cats', 'oxe34', (err, data) => {
            assert.deepEqual(data, {
                'name': 'ada',
                '_id': 'oxe34'
            });
            done();
        });
    });

});

it('gets a dog object given an id', done => {
    getObject('./data', 'dogs', '6ht7u', (err, data) => {
        assert.deepEqual(data, {
            'name': 'beau',
            '_id': '6ht7u'
        });
        done();
    });
});

it('gets a 2nd dog object given an id', done => {
    getObject('./data', 'dogs', 't33t0', (err, data) => {
        assert.deepEqual(data, {
            'name': 'lp',
            '_id': 't33t0'
        });
        done();
    });
});




