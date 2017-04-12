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
            const filePath = path.join(rootDir , table, object._id + '.json');
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
        getAll(table, callback) {

        }
    };
}


module.exports = dbFactory;