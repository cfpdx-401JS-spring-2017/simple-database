const fsp = require('fs-promise');
const path = require('path');
const shortid = require('shortid');
const mkdirp = require('mkdirp-promise');
const rimraf = require('rimraf');

function dbFactory(rootDir) {

  return {

    get(table, id) {
      return new Promise(resolve => {
        const filePath = path.join(rootDir, table, id + '.json');
        fsp.readFile(filePath)
          .then(data => {
            resolve(JSON.parse(data));
          })
          .catch(() => {
            resolve(null);
          });
      });
    },

    getAll(table) {
      return new Promise((resolve, reject) => {
        const dirPath = path.join(rootDir, table);

        fsp.readdir(dirPath)
          .then((files) => {
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
                  } else {
                    reject();
                  }
                });
            });
          });
      });
    },

    save(table, newObject) {
      return new Promise(resolve => {
        const id = shortid.generate();
        newObject._id = id;
        const filePath = path.join(rootDir, table, newObject._id + '.json');
        const dir = path.join(rootDir, table);
        const jsonObj = JSON.stringify(newObject);

        mkdirp(dir)
          .then(() => {
            fsp.writeFile(filePath, jsonObj);
          })
          .then(() => resolve(newObject));
      });
    },

    update(table, updatedObject) {
      return new Promise((resolve, reject) => {
        const id = updatedObject._id;
        if (!id) {
          reject(new Error('Object does not exist.'));
          return;
        }
        const jsonObj = JSON.stringify(updatedObject);
        const filePath = path.join(rootDir, table, id + '.json');
        fsp.writeFile(filePath, jsonObj)
          .then(objToUpdate => {
            resolve(objToUpdate);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    remove(table, id) {
      return new Promise((resolve, reject) => {
        const dirPath = path.join(rootDir, table);
        fsp.readdir(dirPath)
        .then(files => {
          files.forEach((file) => {
            if (file == (id + '.json')) {
              let filePath = path.join(dirPath, file);
              fsp.unlink(filePath);
              let result = { removed: true };
              resolve(result);
            } 
          });
        })
        .catch(() => reject({ removed: false }));
      });
    }
  };
}

module.exports = dbFactory;