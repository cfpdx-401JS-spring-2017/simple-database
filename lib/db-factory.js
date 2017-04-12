const fs = require('fs');
const path = require('path');

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
    save(table, object, callback) {

    },
    getAll(table, callback) {

    }
  };
}

module.exports = dbFactory;

() => {

}

fs.readFile('file', (err, data) => {
  
});