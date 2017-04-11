'use strict';
const fs = require('fs');
const path = require('path');

const getObject = (dir, table, id, callback) => {
  const filePath = path.join(dir, table, id + '.json');
  fs.readFile(filePath, (err, data) => {
    const jsonData = JSON.parse(data);
    console.log('We\'re about to call the callback');
    callback(null, jsonData);
  });
};

module.exports = getObject;