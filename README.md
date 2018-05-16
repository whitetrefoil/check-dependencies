Check Dependencies
=====================================================

A simple lib to check node / npm / package dependencies.

I create this for myself to ensure all teammates will upgrade their node / npm packages during development.

Important
---------

If your code isn't targeting the latest syntax spec of JS / ES,
please use something like babel to transfer this library.

Usage
-----

```typescript

import check from '@whitetrefoil/check-dependencies'

check()
  .then((isOk) => {
    if (isOk !== true) {
      // The lib should already print enough logs automatically.
      // So don't need to print them again.
      process.exit(-1)
    }
  }, (err) => {
    // Shouldn't reach, handle UNEXPECTED error here.
  })

```

Changelog & Roadmap
-------------------

### v0.1.1

* Fix wrong info in README.

### v0.1.0

* Initial release.
