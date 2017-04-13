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

      files.forEach((file, i) => {
        //TODO: Would like to refactor using the get function in SimpleDb
        let id = path.basename(file, '.json');
        this.get(table, id, (err, data) => {
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

  remove(table, id, callback) {
    const dirPath = path.join(this.rootDir, table);
    fs.readdir(dirPath, (err, files) => {
      if (err) return callback(err);
      if (files.indexOf(id + '.json') === -1) {
        let result = { removed: false };
        return callback(null, result);
      }

      files.forEach((file) => {
        if (file == (id + '.json')) {
          let filePath = path.join(dirPath, file);
          fs.unlink(filePath);
          let result = { removed: true };
          callback(null, result);
        }
      });
    });
  }

  update(table, objToUpdate, callback) {
    //reads ._id property / err if not found
    const id = objToUpdate._id;
    if (!id) {
      callback(new Error('Object does not exist.'));
      return;
    }
    //fs.writeFile();
    //saves object as new file
    //returns objToUpdate
    let result = 'Panda!';
    callback(null, result);
  }
}

module.exports = SimpleDb;