//in lab two we're writing multiple function in one file and exporting it once...in order to do this, we have to write our functions as an object in db factory.js

const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const mkdirp = require('mkdirp');



function dbFactory(rootDir) {

    return {
        get(table, id, callback) {
            const filePath = path.join(rootDir, table, id + '.json');

            fs.readFile(filePath, (err, data) => {
                if (err) return callback(err, null);
                const jsonData = JSON.parse(data);

                callback(null, jsonData);

            });
        },
        save(table, object, callback) {
            const id = shortid.generate();
            object._id = id;
            const filePath = path.join(rootDir, table, object._id + '.json');
            const dir = path.join(rootDir, table);
            console.log('dir', dir);
            mkdirp(dir, err => {
                if (err) return callback(err);
                //once the above cb comes back we know we're safe to write the file
                fs.writeFile(filePath, JSON.stringify(object), err => {
                    if (err) return callback(err);
                    callback(null, object);
                });

            });

        },
        //creates a path for directory based on table name
        //readdir returns an array of file names
        getAll(table, callback) {
            const dirPath = path.join(rootDir, table);
            fs.readdir(dirPath, (err, fileName) => {
                if (err) return callback(err);
                let count = fileName.length;
                //for each of the filenames we create a path within the directory
                //for each of the filenames we read the contents of those files
                //then call the callback
                fileName.forEach(fileName => {
                    let filePath = path.join(dirPath, fileName);
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        count--; // same as count = count -1
                        if (count === 0) {
                            callback(null, data);
                        }
                    });
                });
            })

        }
    };
}


module.exports = dbFactory;