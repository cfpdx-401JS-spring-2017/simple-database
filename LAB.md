<img src="https://cloud.githubusercontent.com/assets/478864/22186847/68223ce6-e0b1-11e6-8a62-0e3edc96725e.png" width=30> Simple Database Part 2: Three Tested Async Functions
===

## Doc/Resources
* [Node fs docs](https://nodejs.org/api/fs.html) - specifically the methods `readFile` and `writeFile`

* JSON [stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 
and [parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
* Checkout `mkdirp` and `rimraf` on `npm`

## Description:

In this first part of the assignment, create a function that retrieves an object given a directory, a table name, and an id.

Use json as a file format to store (serialized and deserialized) javascript objects.

**You are strongly encouraged to pair on this assignment**

## Testing

You should use TDD to drive the implementation. Note that these are mostly E2E (end to end) tests, but we will use the 
basic structure of mocha's testing ability.

The setup for the test can be difficult as we want to ensure the tests start with a "clean" file directory **(hint: this is where `rimraf` will come in handy)** You will want to read about [Mocha's before/after hooks](https://mochajs.org/#hooks)

Initially, you can inspect the file system in your tests. 

Your tests will need to handle asynchronous calls.  You will need to read about [Mocha and async support](https://mochajs.org/#asynchronous-code)


## Requirements/Guidelines

Your db should offer the following methods:

* `getObject(<rootDir>, <table>, <id>, callback)`
  * returns the object from the requested table that has that id (where file names are `<id>.json`
  * return `null` if that id does not exist


Here is an example of how your module might be imported (required) and used:

```js
const getObject = require('./getObject');

    
getObject('./data', 'cats', id, (err, cat) => {
  if(err) return console.log('ERROR', err);
  console.log('got cat', cat);
} 
```

Make sure to test:

* Two types of "objects" (e.g. "cats" vs "dogs")
* Two different id's of same object type.


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
     |
     +--+ dogs
        |
        +---* 3tlf4.json
        |
        +---* 23dew3.json
  ```
      
* Use `JSON.parse` and `JSON.stringify` to move from javascript object to file representation
* You should have `package.json` with all scripts and dependecies

Standard repository/dev stuff: README, package.json, travis-ci, tests, meaningful commits, named npm scripts, etc.

## Rubric:

* Tests: 3pts
* Async Coding: 3pts
* Functional Correct Behavior: 2pts
* Project (Module) Organization: 2pts
