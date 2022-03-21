# Notification System

This repo started out as a coding challenge. Now it is a library for a reusable notification system.

## Usage

Wrap your top-level component in the `<NotificationProvider />`, then you will be able to use the `spawnToast` and `spawnModal` methods from the `NotificationContext`. See the [`<DemoApp />`](src/demo-app.tsx) for reference.

## Development

* run `yarn` to install the package's dependencies
* run `yarn start` to start webpack-dev-server on port 3000
* run `yarn build` to compile the application
* run `yarn test --coverage` to run the tests and view the test coverage
* if you add a commit, `yarn fix:script` and `yarn fix:style` will automatically lint the code
* the linters can also be manually be dry-run with `yarn check:script` and `yarn check:style`

## ToDo

* [X] useReducer
* [X] add missing unit tests
* [X] wrap everything in a context provider (global state)
* [X] add notification alerts (modals)
* [ ] add notification banners (?)
