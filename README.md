# Lab 1: Keeley Hammond

In this lab, we successfully wrote asynch tests and practiced using asynch functions and callbacks. To do this, we:

1. Implemented the getObject method: `getObject(<data-dir>, <table>, <id>, callback)`

Usage:

```
getObject('./data', 'cats', f1de5', callback)
getObject('./data', 'dogs', 'l33t0', callback)
```

2. Tested the getObject method with two directories, and two json objects within each of the two directories

3. `getObject` returns `null`, should an object not exist.

4. Tested our function to return null, to ensure it was acting as we thought. We used `if (err) throw err` and then refactored to the below to fulfill the null requirement:

```
if (err) {
  return callback(err, null);
}
```