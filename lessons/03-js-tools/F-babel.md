---
description: "Typically Parcel handles all of your Babel needs out-of-the-box but the pet app project needs one specific transformation. Brian demonstrates how to set up a new Babel configuration."
---

Babel is a core part of the JavaScript tooling ecosystem. At its core it is a transpilation tool: it takes that looks one way and transforms it it into a different looking set of code. One of its core uses to transform futuristic JavaScript (like ES2021) to an older version of JavaScript (like ES5 i.e. JavaScript before 2015) so that older browsers can use your newer JavaScript. Babel also handles things like JSX for us and it can handle TypeScript too.

Typically Parcel handles 100% of your Babel needs and you don't have to care at all what's going on underneath the hood; its Babel config is well crafted and fits nearly all needs. Its one issue is that it can be slow to update when new capabilities come online and that's why here we're going to modify it a bit.

One thing that Parcel 1 does (Parcel 2 whenever it comes out will work differently) is merge your config with their own. That means we only need to set up the one thing we need to change and leave the rest alone. Run the following command:

```bash
npm install -D @babel/preset-react@7.16.7
```

You also need to install the core library from Babel if you're going to provide your own config. Don't worry, if you forget, Parcel will install it for you and update your package.json.

Create a file called `.babelrc` in your home directory and put this in there:

```json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ]
  ]
}
```

> This has been fixed in Parcel 2. Because we're using a release candidate, Parcel isn't detecting the version correctly _yet_. It's been merged, just needs to be released. [See here][parcel2-issue]

The one _additional_ thing we're setting up over what's in the project already is the `automatic` configuration for the JSX transformation. We'll talk about it in the next chapter, but it allows us to omit `import React from 'react'` at the top of every JSX file. If you're using a stable React version or Parcel 2 has fixed this before you take this course (extremely likely it landes before I even get up and teach it) then you can totally ignore this section.

If you needed to update a `preset-env` configuration (a semi-frequent occurrence) or add another transformation, you could do that here too.

> You'll likely get an error from Parcel 2 telling you this it's redundant. It's not until they fix it.

[releases]: https://github.com/parcel-bundler/parcel/releases
[parcel2-issue]: https://github.com/parcel-bundler/parcel/pull/7642
