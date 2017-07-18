# Scripts

Liqen face include several scripts to test, build and run the main and some helper apps.

1. Build and start Liqen Face in production mode
2. Start Liqen Face webapp in development mode
3. Start Storybook in development mode
4. Test Liqen Face
5. Clean the directories

## Build and start the app in production mode

You can ran the application in "production" mode following these steps.

1. `npm run build` to build the app. This generates executable ES5 files in the `/dist` and `/public/dist` directories.
2. `npm run start` which executes the file `/dist/server/index.js` created in the previous step.

## Start the app in development mode

You can also start the application in "development" mode. To do it, `npm run start:dev`.

Instead of generating files, the previous script will execute `babel-node` to transform ES6 server-side code to ES5 in memory.

The client-side code is generated using `webpack-dev-middleware` and `webpack-hot-middleware` which includes hot module replacement.

Both server-side and client-side code are executed with the `NODE_ENV` environmental variable set to `development`.

## Storybook app

Also, you can run the "storybook" application which is a helper app to see the React components in a complete isolated environment. To do it:

1. `npm run start:storybook`

## Test

1. `npm run test:lint` to perform a static analysis of the code.
2. `npm run test:jest` to pass the tests.
3. `npm run test:jest-cov` to pass the test and generate a test coverage report.
4. `npm test` to pass the tests, generate a test coverage report and send the coverage report to coveralls. This script only works in CI environments.

### Clean

Run `npm run clean` to delete the temporal directories.
