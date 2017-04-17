const fs = require('fs');
const path = require('path');
const shortId = require('shortid');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

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
        update(table, objectToUpdate, callback){
            if(!objectToUpdate._id) {
                callback(new Error('Expected object to have an _id property'));
                return;
            }
            const filePath = path.join(rootDir, table, objectToUpdate._id + '.json');
            fs.readFile(filePath, (err, data) => {
                if (err) return callback(err, null);
                let jsonData = JSON.parse(data);
                jsonData.name = objectToUpdate.name;
                fs.writeFile(filePath, JSON.stringify(jsonData), err => {
                    if (err) return callback(err);
                    callback(null, jsonData);
                });
            });
        },
        remove(table, id, callback) {
            const filePath = path.join(rootDir, table, id + '.json');
            const otherPath = path.join(rootDir, table);
            fs.readdir(otherPath, function (err, files) {
                if(files.includes(id + '.json') === false ){
                    return callback(null, { removed: false });
                }
        
                fs.readFile(filePath, (err, data) => {
                    if (err) return callback(err, null);
                    const messageOne = { removed: true };
                    rimraf('./data/bears/' + id + '.json', err => {
                        if (err) return callback(err);
                        callback(null, messageOne);
                    });
                });
            });
        },
        getAll(table, callback) {
            const filePath = path.join(rootDir, table);
            fs.readdir(filePath, function (err, files){
                if(files.length == 0){
                    callback(null, files);
                } 
                var objArr = [];
                files.forEach(a => {
                    const fp = path.join(rootDir, table, a);
                    fs.readFile(fp, (err, data) => {
                        if (err) {
                            return callback(err);
                        }
                        let jsonData = JSON.parse(data);
                        objArr.push(jsonData);
                        if(objArr.length === files.length){
                            callback(null, objArr);
                        }                
                    });
                });
            });
        },
        save(table, object, callback) {
            const id = shortId.generate();
            object._id = id;
            const filePath = path.join(rootDir, table, object._id + '.json');
            const dir = path.join(rootDir, table);
            mkdirp(dir, err => {
                if(err) return callback(err);
                fs.writeFile(filePath, JSON.stringify(object), err => {
                    if (err) return callback(err);
                    callback(null, object);
                });
            });
        }
    };
}

module.exports = dbFactory;