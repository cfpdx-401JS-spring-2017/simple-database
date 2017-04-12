'use strict';
const fs = require('fs');
const path = require('path');

const getObject = (dir, table, id, callback) => {
  const filePath = path.join(dir, table, id + '.json');
  fs.readFile(filePath, (err, data) => {
    if(err) {
      return callback(err, null);
    }
    const jsonData = JSON.parse(data);
    callback(null, jsonData);
  }); 
};

module.exports = getObject;