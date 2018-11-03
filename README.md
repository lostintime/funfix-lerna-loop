Funfix Infinite Loop with lerna
===============================

In a [lerna](https://github.com/lerna/lerna/) project setup, when multiple packages depend on `funfix-effect` (`IO`), combining IO's from those packages leads to an infinite loop here: https://github.com/funfix/funfix/blob/master/packages/funfix-effect/src/io.ts#L2200.
This is caused by the fact that different lerna packages load different `funfix-core` module instances and different `Try` constructors so `instanceof` doesn't work.

This affects only development stage when packages are linked and can be worked around by using lerna's [hoisting](https://github.com/lerna/lerna/blob/master/doc/hoist.md) feature, so duplicate `funfix` packages will be moved to top level `node_modules` folder.

## Some ideas to settle this

1. Use optional check by constructor name, ex:

  ```typescript
  if (current instanceof Try || (current.constructor && (current.constructor.name === "TSuccess" || current.constructor.name === "TFailure"))) {
    // ...yeah, ugly hack
  }
  ```

2. Throw an error in default switch branch here: https://github.com/funfix/funfix/blob/master/packages/funfix-effect/src/io.ts#L2274 with an explanation of the issue, so at least developers know how to workaround it. As CONS - exhaustivity check will be lost for this switch statement :(, may be covered by tests.

3. Add a warning note in [IO's](https://funfix.org/api/effect/classes/io.html) documentation to inform developers about potential issue

Related issue: https://github.com/lerna/lerna/issues/1451 (hosting is not an option for thit guy)

## Installation

Clone this repo then run `npm install`.

To reproduce the issue run

```
npm run start
```
and this shoud never finish execution.