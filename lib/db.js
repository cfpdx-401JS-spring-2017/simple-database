'use strict';
//create a function that takes dir, table (cats/dog/pada...the name of your subfolder in data dir, data dir = database, subfolders = db tables), id, callback
// module.exports the function that you just created
 //we have to call our callback here, otherwise the dones in our test won't happen
   //path.join([...paths])

const fs = require('fs');
//this allows us to join filepaths
const path = require('path');

const getObject = (dir, table, id, callback) => {
    const filePath = path.join(dir, table, id + '.json');
  
    fs.readFile(filePath ,(err, data) => {
       //this line stops the code and throws and error, if there's an errors
        if(err) return callback(err, null);
     //readFile returns a string of the data that it reads, so you must parse it if you want it function like a typical object.
        const jsonData = JSON.parse(data);

        callback(null, jsonData);
       
    });
};

module.exports = getObject;