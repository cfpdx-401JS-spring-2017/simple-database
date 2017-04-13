const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const mkdirp = require('mkdirp');

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

  getAll(table, callback) {
    const dirPath = path.join(this.rootDir, table);
    fs.readdir(dirPath, (err, files) => {
      if (err) return callback(err);
      let count = files.length;
      let fileArray = [];
      files.forEach( (file, i) => {
        //TODO: Would like to refactor using the get function in SimpleDb
        let filePath = path.join(dirPath, file);
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) return callback(err);
          fileArray[i] = data; //ensures that fileArray's files match order of <table> files
          count--;
          if (count === 0) {
            callback(null, fileArray);
          }
        });
      });
    });
  }

  save(table, newObj, callback) {
    const id = shortid.generate();
    newObj._id = id;
    const jsonObj = JSON.stringify(newObj);
    const filePath = path.join(this.rootDir, table, id + '.json');

    const dirp = path.join(this.rootDir, table);
    mkdirp(dirp, err => {
      if (err) return callback(err);
      fs.writeFile(filePath, jsonObj, err => {
        if (err) return callback(err);
        callback(null, newObj);
      });
    });
  }
}

module.exports = SimpleDb;