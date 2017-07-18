# Server-side code

The server is organized in the following parts:

- `index` and `router` (single files)
- `endpoints` and `middlewares` (directories)
- `views` (directory)

## Index and router

- `index` is the file that will be executed. It:
  -  configures the server (Express app)
  -  starts the server
  -  joins everything together.

- `router` is the router file. Maps every HTTP request to JavaScript functions (Endpoints and Middlewares).

## Endpoints and middlewares

Endpoints and Middlewares are JavaScript functions that do one operation. Both have the same syntax (function with two-three arguments) and there is no "formal" difference between them. However we will use the following convention:

- Endpoints are functions with two arguments (`req` and `res`). They always finish the HTTP request by sending something as a response.
- Middlewares in the other hand, are thought to be functions in the middle of the chain. They can finish the HTTP request but also they can *call the next step of the chain*.

Middlewares usually are operations like `check-session`. The `check-session` checks if the user is logged in and if not, redirects them to the login page. If the user is logged in, the *next* item in the chain is called.

For example:

```
check-session > annotate
```

![](http://www.plantuml.com/plantuml/png/VOzD2i8m48NtESLSGDnB2BWekl47ZGSOag46moGaKxo-RQd52hfzVDzxF7II2jmg5PMnI70X8mjSKYTVaRkJUrofrf1OwqFmFj8J2ncpmBRCIL18wuPzJe6b1zGm0AkLcOfX0xl6mXedM4tnG7pkA8m2tU262Z6rBNa8h601ZTPxjczs6AEYM6asZoVxnpRZ_LxSMtk6GZKdhgI8lPfRVq0l)

As you can see, **annotate** is only called if the user is logged in.

More info in the [Express website](http://expressjs.com/en/guide/writing-middleware.html)

## Views

They are `ejs` templates that are rendered in some endpoints
