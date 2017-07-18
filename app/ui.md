# User Interface

User Interface is formed by the items:

- **Components**. Independent containers of DOM subtrees, CSS and JavaScript. They could have states internally.
- **Screens**. Subset of Components. Screens are components that are rendered occupying all the React container.
- **Stories**. Use cases for components.

## Components and screens

Each file `exports default` a component. Internally they can have more helper components but the exported has to be only one.

Optionally they can export all the helper components for testing purposes. In this case, it is better to have that helper components in separate files.

### Conventions

For stateless components

```js
import React from 'react'

// Declare the propTypes in the beginning.
const propTypes = {}

// Use ES5 **named** functions instead of arrow functions
// Because on `export default` doesn't allow to export and declare constants
export default function Component () {
  return ...
}

// Set the propTypes inmediately after the component declaration
Component.propTypes = propTypes

// Helper components go after
// These can be arrow functions.
const Helper = () => ()
```

For stateful components

```js
import React from 'react'

// Declare the propTypes in the beginning.
const propTypes = {}

// Use ES6 classes
export default class Component extends React.Component {
  // Do not use static field for declaring propTypes
  // until it becomes a ECMAScript Standard
}

// Set the propTYpes inmediately after the component declaration
Component.propTypes = propTypes
```

## Stories

TODO
