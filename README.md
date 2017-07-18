[![Build Status](https://travis-ci.org/CommonActionForum/liqen-face.svg?branch=master)](https://travis-ci.org/CommonActionForum/liqen-face)
[![Coverage Status](https://coveralls.io/repos/github/CommonActionForum/liqen-face/badge.svg?branch=master)](https://coveralls.io/github/CommonActionForum/liqen-face?branch=master)

# Liqen Front-end

This is the Liqen Web Application.

## To build and start in production mode

```sh
npm run build
npm run start
```

By default the script will start a web application connected to the Liqen Core. If you want to connect to another instance of Liqen Core and know its URL, assign the environmental variable `LIQEN_API_URI` to the url. Example:

```sh
LIQEN_API_URI=http://localhost:4000 npm run build
LIQEN_API_URI=http://localhost:4000 npm run start
```

See [more scripts](/docs/scripts.md)

## Contributing to Liqen Face

See [the docs](docs/README.md)
