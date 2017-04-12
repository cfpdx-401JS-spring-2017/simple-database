const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

class SimpleDb {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }
  
  get(table, id, callback) {
    const filePath = path.join(this.rootDir, table, id + '.json');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return callback(err, null);
      }
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    });
  }

  // TODO: write getAll
  // getAll(table, callback) {
  // } //end getAll

  save(table, newObj, callback) {
    const id = shortid.generate();
    newObj._id = id;
    const jsonObj = JSON.stringify(newObj);
    const filePath = path.join(this.rootDir, table, id + '.json');

    fs.writeFile(filePath, jsonObj, err => {
      if (err) return callback(err);
      callback(null, newObj);
    });
  }
}

module.exports = SimpleDb;