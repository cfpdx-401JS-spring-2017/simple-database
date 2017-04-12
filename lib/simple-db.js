const fs = require('fs');
const path = require('path');

class SimpleDb {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  get(dir, table, id, callback) {
    const filePath = path.join(dir, table, id + '.json');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return callback(err, null);
      }
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    });
  }
  getAll() {
    //this.rootDir
  }
  save() {
    //this.rootDir
  }
}

module.exports = SimpleDb;