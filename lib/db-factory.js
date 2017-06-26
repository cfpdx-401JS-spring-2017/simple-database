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

    getAll(table, callback) {
      const dirPath = path.join(rootDir, table);

      fs.readdir(dirPath, (err, files) => {
        if (err) return callback(err);
        let count = files.length;
        let fileArray = [];

        if (!count) callback(null, fileArray);

        files.forEach(file => {
          let filePath = path.join(dirPath, file);
          
          fs.readFile(filePath, (err, data) => {
            if (err) return callback(err);
            fileArray.push(data);
            count--;
            if (!count) callback(null, fileArray);
          });
        });
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

    remove(table, id, callback) {
      const dirPath = path.join(rootDir, table);
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
    },

    update(table, object, callback) {
      const id = object._id;
      if (!id) {
        callback(new Error('Object does not exist.'));
        return;
      }
      const jsonObj = JSON.stringify(object);
      const filePath = path.join(rootDir, table, id + '.json');
      
      fs.writeFile(filePath, jsonObj, err => {
        if (err) return callback(err);
        callback(null, object);
      });
    }
  };
}


module.exports = dbFactory;