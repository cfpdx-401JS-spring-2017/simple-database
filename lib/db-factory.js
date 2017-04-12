const fs = require('fs');
const path = require('path');

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
        getAll(table, callback) {

        },
        save(table, object, callback) {

        }
    };
}

module.exports = dbFactory;
