---
description: "Brian quickly converts SearchParams.tsx"
---

Let's go do SearchParams.tsx

```tsx
// update React import, add Reach Router import
import { FunctionComponent, useState, useEffect, useContext } from "react";
import { PetAPIResponse, Animal, Pet } from "./APIResponsesTypes";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

// replace function declaration
const SearchParams: FunctionComponent = () => {
  …
}

// replace useState calls
const [animal, updateAnimal] = useState("" as Animal);
const [pets, setPets] = useState([] as Pet[]);

// in PetRequest
const json = (await res.json()) as PetAPIResponse;

//
<select
  id="animal"
  value={animal}
  onChange={(e) => {
    updateAnimal(e.target.value as Animal);
    updateBreed("");
  }}
  onBlur={(e) => {
    updateAnimal(e.target.value as Animal);
    updateBreed("");
  }}
>
  { … }
</select>
```

- Occasionally you need to give TypeScript a hint to what it's going to get. That's what `as` for: you're saying I'm sure it's going to be this.
- We didn't have to add all the Animal typings but since we know it's that we may as well.

> 🏁 [Click here to see the state of the project up until now: typescript-4][step]

[step]: https://github.com/btholt/citr-v7-project/tree/master/typescript-4
