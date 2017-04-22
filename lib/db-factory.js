const fsp = require('fs-promise');
const path = require('path');
const shortid = require('shortid');
const mkdirp = require('mkdirp-promise');
const rimraf = require('rimraf');

function dbFactory(rootDir) {

  return {

    get(table, id) {
      const filePath = path.join(rootDir, table, id + '.json');
      return fsp.readFile(filePath)
        .then((data) => JSON.parse(data));
    },

    save(table, newObject) {
      const id = shortid.generate();
      newObject._id = id;
      const filePath = path.join(rootDir, table, newObject._id + '.json');
      const dir = path.join(rootDir, table);
      const jsonObj = JSON.stringify(newObject);

      return mkdirp(dir)
        .then(() => fsp.writeFile(filePath, jsonObj))
        .then(() => newObject);
    },

    getAll(table) {
      const dirPath = path.join(rootDir, table);

      return fsp.readdir(dirPath)
        .then((files) => {
          const promises = files.map(file => {
            let id = path.basename(file, '.json');
            return this.get(table, id);
          });
          return Promise.all(promises);
        });
    },

    update(table, updatedObject) {
      const id = updatedObject._id;
      const filePath = path.join(rootDir, table, id + '.json');
      return fsp.writeFile(filePath, JSON.stringify(updatedObject))
        .then((updated) => updated);
    },

    remove(table, fileNameToRemove, callback) {
      let removed = false;
      const id = fileNameToRemove;
      const RemoveFilePath = `${rootDir}/${table}/${id}.json`;
      if (!id) {
        callback(new Error('Expected object in file to have an _id property'));
        return removed;
      }

      rimraf(RemoveFilePath, err => {
        if (err) return callback(err);
        removed = true;
        callback(null, removed);
      });
    }
  };
}

module.exports = dbFactory;