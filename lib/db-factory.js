const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

function dbFactory(rootDir) {

  return {
    get(table, id, callback) {
      const filePath = path.join(rootDir, table, id + '.json');
      fs.readFile(filePath, (err, data) => {
        if (err) {
          return callback(err, null);
        }
        const jsonData = JSON.parse(data);
        callback(null, jsonData);
      });
    },
    getAll(table, callback) {
      
    },
    save(table, object, callback) {
      const id = shortid.generate();
      const filePath = path.join(rootDir, table, object._id + '.json');
      object._id = id;
      fs.writeFile(filePath, JSON.stringify(object), err => {
        if(err) return callback(err);
        callback(null, object);
      });
    }
  };
}

module.exports = dbFactory;