const fs = require('fs');
const path = require('path');

class SimpleDb {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }
  //get object
  get(table, id, callback) {
    const filePath = path.join(this.rootDir, table, id + '.json');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return callback(err, null);
      }
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    });
  } //end get

  // TODO: write getAll
  // getAll(table, callback) {

  // } //end getAll

  save(table, newObj, callback) {
    const filePath = path.join(this.rootDir, table);
    fs.writeFile(id, newObj, (err, data) => {
      if (err) return done(err);

    });
    callback();
  } //end save
}

module.exports = SimpleDb;