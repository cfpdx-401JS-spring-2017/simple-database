
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
            object._id = id;//we're adding an id property to our object

            const filePath = path.join(rootDir, table, object._id + '.json');
            const dir = path.join(rootDir, table);

            //if DIR does not already exist, make one.
            mkdirp(dir, err => {
                if (err) return callback(err);

                //once the above cb comes back we know we're safe to write the file
                fs.writeFile(filePath, JSON.stringify(object), err => {
                    if (err) return callback(err);
                    callback(null, object);
                });

            });

        },
        //creates a path for directory based on table(animal) name
        //readdir returns an array of file names
        //for each of the filenames we create a path within the directory
        //for each of the filenames we read the contents of those files
        //then call the callback
        getAll(table, callback) {
            const dirPath = path.join(rootDir, table);
            const getAllArray = [];

            fs.readdir(dirPath, (err, fileName) => {
                if (err) return callback(err);

                let count = fileName.length;

                if (!count) {
                    callback(null, getAllArray);
                }

                fileName.forEach(fileName => {
                    let filePath = path.join(dirPath, fileName);
                    fs.readFile(filePath, 'utf8', (err, data) => { //utf8 is the default options for readFile
                        const parsedData = JSON.parse(data);
                        getAllArray.push(parsedData);
                    


                        count--; // same as count = count -1
                        if (count === 0) {
                            callback(null, getAllArray);
                        }
                    });
                });
            });

        },

        update(table, objectToUpdate, callback) {
            const id = objectToUpdate._id;

            if (!id) {

                callback(new Error('expected to have an _id proprty'));
                return;
            }
            this.get(table, id, err => {
                if (err) return callback(err);
                const updatedObjectPath = path.join(rootDir, table, id + '.json');
                fs.writeFile(updatedObjectPath, JSON.stringify(objectToUpdate), err => {
                    if (err) return callback(err);
                    callback(null, objectToUpdate);


                });
            });

        },

        remove(table, id, callback) {
            const objectToRemovePath = path.join(rootDir, table, id + '.json');
            fs.unlink(objectToRemovePath, (err) => {
                if (err) return callback({ removed: false });
                callback(null, { removed: true });
            });
        }
    };
}


module.exports = dbFactory;