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
        getAll(table, callback) {
            const filePath = path.join(rootDir, table);
            var cats = fs.readdirSync(filePath);
            var objArr = [];
            cats.forEach(a => {
                const fp = path.join(rootDir, table, a);
                fs.readFile(fp, (err, data) => {

                    if (err) {
                        return callback(err);
                    }
                    let jsonData = JSON.parse(data);
                    objArr.push(jsonData);
                    console.log(objArr);
                    if(objArr.length === cats.length){
                        callback(null, objArr);
                    }                
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