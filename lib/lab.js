'use strict';
const fs = require('fs');
const path = require('path');
// `getObject(<rootDir>, <table>, <id>, callback)`

const getObject = (dir, table, id, callback) => {
  // find directory
  // find table
  // find id
  // hit 'done', do action to pass
  fs.readFile(dir, table, id, (err, data) => {
    const jsonData = JSON.parse(data);
    return jsonData;
  });
  callback();
};

module.exports = getObject;