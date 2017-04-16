# Lab 3: Keeley Hammond
## Completed!

In this lab, we refactored our last lab and created two additional functions, remove and update.

1. Refactored our: `getObject(<data-dir>, <table>, <id>, callback)` method into `db.get(<data-dir>, <table>, <id>, callback)`.

2. Created a `db.remove` function that returns true if the object is removed, and false if it is not removed.

Usage:

```
remove(table, id, callback)
```

3. Tested the remove function with both an object that does exist upon setup, and an object which does not exist.

4. Created an `db.update` function that returns the newly updated object, or throws an error if the object does not exist.

Usage:

```
update(table, object, callback)
```

5. Tested the remove function with both an object that does exist upon setup, and an object which does not exist.

6. Cleaned up and slighly refactored the code and published to npm!