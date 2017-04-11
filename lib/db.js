'use strict';
//create a function that takes dir, table (cats/dog/pada...the name of your subfolder in data dir, data dir = database, subfolders = db tables), id, callback
// module.exports the function that you just created
const fs = require('fs');
//this allows us to join filepaths
const path = require('path');

const getObject = (dir, table, id, callback) => {
    //we have to call our callback here, otherwise the dones in our test won't happen

    callback();
}

module.exports = getObject;