# Notification System

This repo started out as a coding challenge. Now it is a reusable library for a notification system.

## Usage

Wrap your top-level component in the `<NotificationProvider />` and insert the `<BannerArea />` component as one of its children, in order to use the `spawnBanner`, `spawnModal` and `spawnToast` methods from the `NotificationContext`. See the [`<DemoApp />`](src/demo-app.tsx) for reference.

## Development

* run `yarn` to install the package's dependencies
* run `yarn start` to start webpack-dev-server on port 3000
* run `yarn build` to compile the application
* run `yarn test --coverage` to run the tests and view the test coverage
* if you add a commit, `yarn fix:script` and `yarn fix:style` will automatically lint the code
* the linters can also be manually be dry-run with `yarn check:script` and `yarn check:style`
