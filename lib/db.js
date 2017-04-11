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
   console.log(filePath);
   fs.readFile(filePath ,(err, data) => {
       console.log(data);
       const jsonData = JSON.parse(data);

    callback(null, jsonData);
       
   });
}

module.exports = getObject;