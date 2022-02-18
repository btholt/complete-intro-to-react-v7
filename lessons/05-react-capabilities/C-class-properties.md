---
description: "Using constructors to set initial state for class components is verbose and can be done better. Brian teaches you to use the new feature in JavaScript, class properties, to make your code easy to read."
---

The constructor is annoying. We can use something called class properties to make it a lot nicer and easier to read. Class properties are a new part of JavaScript so we need Parcel transform the code when Parcel transpiles our code. Luckily our config will do that by itself so no further changes are needed (previously we did need to.)

Parcel will merge this config with what it has already, so we just need to pull in the one Babel plugin we need.

```bash
npm i -D @babel/plugin-proposal-class-properties@7.16.7
```

Now make a file called `.babelrc` with the following:

```json
{
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

Babel's core concept is a plugin. Every one sort of a transformation it can perform is encapsulated into a plugin. Here we're including one explicitly: class properties.

Now with this, we can modify Details to be as so:

```javascript
// replace constructor
state = { loading: true };
```

Loads easier to read, right?
