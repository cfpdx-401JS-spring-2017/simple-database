   //in lab two we're writing multiple function in one file and exporting it once...in order to do this, we have to write our functions as an object in db factory.js

const fs = require('fs');
const path = require('path');


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
        getAll(table, callback) {

        },
        save(table, object, callback) {

        }
    };
}


module.exports = dbFactory;