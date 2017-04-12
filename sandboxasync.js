const fs = require('fs');

fs.writeFileSync('foo.txt', 'foo') 
console.log('done with the foo file');


fs.writeFileSync('bar.txt', 'bar')
console.log('done with the bar file');
