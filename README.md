# Lab 2: Keeley Hammond

In this lab, we refactored our last lab and created three functions attached to a class (SimpleDb - get(), save(), and gatAll()) that we could then use to run tests. To do this, we:

1. Refactored our: `getObject(<data-dir>, <table>, <id>, callback)` method into `db.get(<data-dir>, <table>, <id>, callback)`.

2. Set a constant variable for root directory within our class constructor, `this.rootDir`. We also set variable names for our tables and ids as inputs for arguments.

Usage:

```
get(this.rootDir, table, id, callback)
getAll(this.rootDir, table, callback)
```

2. Used rimraf and mkdirp to ensure that if a directory does not exist, that it will be created. Rimraf also ensures that our testing environment will start with a clean by deleting old directories.

3. `getObject` returns `null`, should an object not exist.

4. `db.save` uses the shortid node library to assign an id to new objects being created within the save function.