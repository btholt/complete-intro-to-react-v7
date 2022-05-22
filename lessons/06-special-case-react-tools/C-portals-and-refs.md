---
description: "Portals allow you to render to a place outside of a component from within a component. Think of a contextual nav bar or side nav."
---

Another nice feature React is something called a Portal. You can think of the portal as a separate mount point (the actual DOM node which your app is put into) for your React app. A common use case for this is going to be doing modals. You'll have your normal app with its normal mount point and then you can also put different content into a separate mount point (like a modal or a contextual nav bar) directly from a component. Pretty cool!

First thing, let's go into index.html and add a separate mount point:

```html
<!-- above #root -->
<div id="modal"></div>
```

This where the modal will actually be mounted whenever we render to this portal. Totally separate from our app root.

Next create a file called Modal.js:

```javascript
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
```

- This will mount a div inside of the portal whenever the Modal is rendered and then _remove_ itself whenever it's unrendered.
- We're using the feature of `useEffect` that if you need to clean up after you're done (we need to remove the div once the Modal is no longer being rendered) you can return a function inside of `useEffect` that cleans up.
- We're also using a ref here via the hook `useRef`. Refs are like instance variables for function components. Whereas on a class you'd say `this.myVar` to refer to an instance variable, with function components you can use refs. They're containers of state that live outside a function's closure state which means anytime I refer to `elRef.current`, it's **always referring to the same element**. This is different from a `useState` call because the variable returned from that `useState` call will **always refer to the state of the variable when that function was called.** It seems like a weird hair to split but it's important when you have async calls and effects because that variable can change and nearly always you want the `useState` variable, but with something like a portal it's important we always refer to the same DOM div; we don't want a lot of portals. If this is confusing to you, we dive deeper into it in [the useRef section of Intermediate React][useref].
- Down at the bottom we use React's `createPortal` to pass the children (whatever you put inside `<Modal></Modal>`) to the portal div.

Now go to Details.js and add:

```javascript
// at the top
import Modal from "./Modal";

// add showModal
state = { loading: true, showModal: false };

// above render
toggleModal = () => this.setState({ showModal: !this.state.showModal });

// add showModal
const { animal, breed, city, state, description, name, images, showModal } =
  this.state;

// add onClick to <button>
<button onClick={this.toggleModal} style={{ backgroundColor: theme }}>
  Adopt {name}
</button>;

// below description
{
  showModal ? (
    <Modal>
      <div>
        <h1>Would you like to adopt {name}?</h1>
        <div className="buttons">
          <a href="https://bit.ly/pet-adopt">Yes</a>
          <button onClick={this.toggleModal}>No</button>
        </div>
      </div>
    </Modal>
  ) : null;
}
```

- We're using an `a` for the adopt functionality to redirect offsite but you could easily make this a function that calls an API to commit the adopt action for your site.
- Notice that despite we're rendering a whole different part of the DOM we're still referencing the state in Details.js. This is the magic of Portals. You can use state but render in different parts of the DOM. Imagine a sidebar with contextual navigation. Or a contextual footer. It opens up a lot of cool possibilities.

That's it! That's how you make a modal using a portal in React. This used to be significantly more difficult to do but with portals it became trivial. The nice thing about portals is that despite the actual elements being in different DOM trees, these are in the same React trees, so you can do event bubbling up from the modal. Some times this is useful if you want to make your Modal more flexible (like we did.)

> 🏁 [Click here to see the state of the project up until now: 12-portals-and-refs][step]

[portal]: https://reactjs.org/docs/portals.html
[step]: https://github.com/btholt/citr-v7-project/tree/master/12-portals-and-refs
[useref]: https://btholt.github.io/complete-intro-to-react-v7/lessons/hooks-in-depth/useref
