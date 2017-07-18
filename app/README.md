# The /app directory

This directory has most of the files of Liqen Face, including UI and state management.

Most part of the code is meant to be used in the client-side, but, in a near future, this code can be rendered in server-side. That is the reason of the existance of this directory.

## State vs UI

State management and UI are completely separated. This separation of concerns allow us to test each part separately.

### State

We define **state** as information known by the app. We represent the state as a JavaScript object. The combination of the state, business rules that changes the state, and the possible changes in the state is what we call **state management**. To manage the state, we use a library called [Redux](http://redux.js.org/). State includes the following elements (each in one directory)

- [Reducers](./reducers/README.md)
- [Actions](./actions/README.md)
- [Middlewares](./middlewares/README.md)

### UI

In the other hand, the **UI** groups the things that are presented to the user, and the things that the user can interact with. They are independent from the state.

To manage the **UI** we use [React](https://facebook.github.io/react/) that allow us to create complex user interfaces and components.

We use the following items to manage the UI (each in one directory):

- [Components](./components/README.md)
- [Screens](./screens/README.md)
- [Stories](./stories/README.md)

### Linking state and UI

An app needs state to be affected by user interactions via the UI. To allow this connection between UI and state, we use the [React-Redux official bindings](https://github.com/reactjs/react-redux). The elements that kinks state and UI are containers

- [Containers](./containers/README.md)
