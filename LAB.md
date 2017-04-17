<img src="https://cloud.githubusercontent.com/assets/478864/22186847/68223ce6-e0b1-11e6-8a62-0e3edc96725e.png" width=30> Simple Database Part 3: Remove, Update and Publish!
===

## Description:

For part three of the assignment:

* Add tested `remove` and `update` methods to your db
* Clean up your project

## Requirements/Guidelines

Your db should offer the following methods:

* `.update(<table>, <objectToUpdate>, callback)`
  * reads the `_id` property from the object (error if it is not found):
  ```js
  const id = objectToUpdate._id;
  if(!id) {
      callback(new Error('Expected object to have an _id property'));
      return;
  }
  ```
  * saves the provided object as the new file
  * returns `objectToUpdate`
* `.remove(<table>, <id>, callback)`
  * removes the object from the requested table that has that id
  * return `{ removed: true }` if the object was removed, else return `{ removed: false }` if the 
  object did not exist
  
**You are strongly encouraged to pair on this assignment**


### Bonus

1. Adda README.md that describes how to use your simple db
2. Publish to npm


Here is an example of how your module might be imported (required) and used:

```js
const makeDb = require('./db-factory');

const db = makeDb('./data');

db.save('cats', { name: 'garfield' }, (err, cat) => {
  
    if(err) return console.log('ERROR', err);
    
    const id = cat._id;
    
    db.get('cats', id, (err, cat) => {
      if(err) return console.log('ERROR', err);
      console.log('got cat', cat);
    } 
});

db.getAll('cats', (err, cats) => {
  if(err) return console.log('ERROR', err);
  console.log('we have', cats.length, 'cats');
});
```


* Use an npm package to find a library to assign id's (there are tons), e.g. [shortid](https://www.npmjs.com/package/shortid) or [uuid](https://www.npmjs.com/package/uuid)
* Use the supplied table name as a folder to store objects, and use the id as the file name:

  ```
  ---+ data
     |
     +--+ cats
        |
        +---* 34fdr5.json
        |
        +---* 65rej5.json
        |
        +---* 93odb2.json
  ```
      
* Use `JSON.parse` and `JSON.stringify` to move from javascript object to file representation
* You should have `package.json` with all scripts and dependecies

Standard repository/dev stuff: README, package.json, travis-ci, tests, meaningful commits, named npm scripts, etc.

## Rubric:

* Tests: 3pts
* Async Coding: 3pts
* Functional Correct Behavior: 2pts
* Project (Module) Organization: 2pts