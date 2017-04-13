const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const mkdirp = require('mkdirp');

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
      const id = shortid.generate();
      object._id = id;
      const filePath = path.join(rootDir, table, object._id + '.json');
      const dir = path.join(rootDir, table);
      mkdirp(dir, err => {
        if (err) return callback(err);
        fs.writeFile(filePath, JSON.stringify(object), err => {
          if (err) return callback(err);
          callback(null, object);
        });
      });
    },

    getAll(table, callback) {
      const dirPath = path.join(rootDir, table);
      fs.readdir(dirPath, (err, files) => {
        if (err) return callback(err);
        let count = files.length;
        let fileArray = [];
        files.forEach((file, i) => {
          let id = path.basename(file, '.json');
          this.get(table, id, (err, data) => {
            if (err) return callback(err);
            fileArray[i] = data;
            count--;
            if (count === 0) {
              callback(null, fileArray);
            }
          });
        });
      });
    },

    update(table, updatedObject, callback) {
      const id = updatedObject._id;
      if (!id) {
        callback(new Error('expected to have property of _id'));
        return;
      }
      const filePath = path.join(rootDir, table, id + '.json');
      fs.writeFile(filePath, JSON.stringify(updatedObject), err => {
        if (err) return callback(err);
        callback(null, updatedObject);
      });
    }
  };
}

module.exports = dbFactory;