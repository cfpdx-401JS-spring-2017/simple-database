const fs = require('fs');
const fsp = require('fs-promise');
const path = require('path');
const shortid = require('shortid');
const mkdirp = require('mkdirp-promise');

class SimpleDb {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }
  //TODO: Promisify 'get'
  get(table, id) {
    return new Promise((resolve, reject) => {
      const filePath = path.join(this.rootDir, table, id + '.json');
      fsp.readFile(filePath)
        .then(data => {
          resolve(JSON.parse(data));
        })
        .catch(() => {
          reject(null);
        });
    });
  }

  getAll(table) {
    return new Promise((resolve) => {
      const dirPath = path.join(this.rootDir, table);
      fsp.readdir(dirPath)
        .then(files => {
          let count = files.length;
          let fileArray = [];

          files.forEach((file, i) => {
            let id = path.basename(file, '.json');
            this.get(table, id)
              .then(data => {
                fileArray[i] = data;
                count--;
                if (count === 0) {
                  resolve(fileArray);
                }
              });
          });
        });
    });
  }

  save(table, newObj) {
    return new Promise((resolve) => {
      const id = shortid.generate();
      newObj._id = id;
      const jsonObj = JSON.stringify(newObj);
      const filePath = path.join(this.rootDir, table, id + '.json');

      const dirp = path.join(this.rootDir, table);
      mkdirp(dirp)
      .then(() => {
        fsp.writeFile(filePath, jsonObj);
      })
      .then(resolve(newObj));
    });
  }

  remove(table, id) {
    return new Promise((resolve, reject) => {
      const dirPath = path.join(this.rootDir, table);
      fsp.readdir(dirPath)
      .then(files => {
        if (files.indexOf(id + '.json') === -1) {
          let result = { removed: false };
          resolve(null, result);
        }

        files.forEach((file) => {
          if (file == (id + '.json')) {
            let filePath = path.join(dirPath, file);
            fs.unlink(filePath);
            let result = { removed: true };
            resolve(null, result);
          }
        });
      });
    });
  }

  update(table, objToUpdate) {
    return new Promise((resolve, reject) => {
      const id = objToUpdate._id;
      if (!id) {
        reject(new Error('Object does not exist.'));
        return;
      }
      const jsonObj = JSON.stringify(objToUpdate);
      const filePath = path.join(this.rootDir, table, id + '.json');
      fs.writeFile(filePath, jsonObj)
      .then(objToUpdate => {
        resolve(null, objToUpdate);
      });
    });
  }
}

module.exports = SimpleDb;