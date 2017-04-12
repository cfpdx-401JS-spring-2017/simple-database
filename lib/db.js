'use strict';
const fs = require('fs');
const path = require('path');

const getObject = (dir, table, id, callback) => {
    const filePath = path.join(dir, table, id + '.json');
    console.log(filePath);
    fs.readFile(filePath, (err, data) => {
        console.log(data);
        if(err){
            return callback(err, null);
        }
        const jsonData = JSON.parse(data);
        console.log('json data is', jsonData);
        callback(null, jsonData);
    });
};

module.exports = getObject;