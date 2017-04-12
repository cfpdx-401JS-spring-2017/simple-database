const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

function dbFactory(rootDir) {

    return{
        get(table, id, callback) {
            const filePath = path.join(rootDir, table, id + '.json');
                console.log(filePath);
                fs.readFile(filePath, (err, data) => {
                    console.log(data);
                    if(err){
                        return callback(err, null);
                    }
                    const jsonData = JSON.parse(data);
                    console.log('json data is', jsonData);
                    callback(null, jsonData);
                });

        },
        save(table, object, callback) {
            const id = shortid.generate();
            object._id = id;
            const filePath = path.join(rootDir, table, object._id + '.json');
            fs.writeFile(filePath, JSON.stringify(object), err => {
                if(err) return callback(err);
                callback(null, object);
            });
        },
        getAll(table, callback) {

        },
    };
}

module.exports = dbFactory;
