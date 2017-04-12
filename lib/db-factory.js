   //in lab two we're writing multiple function in one file and exporting it once...in order to do this, we have to write our functions as an object in db factory.js

const fs = require('fs');
const path = require('path');
const shortid = require('shortid');


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
            const filePath = path.join(rootDir , table, object._id + 'json');
            
            fs.writeFile(filePath, JSON.stringify(object), err => {
                if (err) return callback(err);
                callback(null, object);
            });
           
        },
        getAll(table, callback) {

        }
    };
}


module.exports = dbFactory;