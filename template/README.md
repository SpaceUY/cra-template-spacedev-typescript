# CRA starter template

By:

[![SpaceDev](https://uploads-ssl.webflow.com/61e097dd988731696768be21/62042f55a072ef02ab1d11a2_logo%20del%20mismo%20taman%CC%83o%20que%20el%20texto.svg)](https://www.spacedev.io/)

## Basic

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Available Scripts

In the project directory, you can run:

##### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

##### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

##### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Advanced

> **Note:** if you can't make sense of what's detailed here you shouoldn't be making decisions regarding the following subjects

### What is State?

- The _state_ is the business-related data.
- No UI related data (the app theme is an exception here)
- No error handling
- ...

### State Management

We indentified 3 different types or levels of state

- Global State
  - Accessible throughout the whole app
  - Reserved for data that we want to fetch as little as possible. e.g.: authenticated user's data, app theme, etc.
  - Probably handled with [Redux](https://redux.js.org/) and [Redux-Toolkit](https://redux-toolkit.js.org/)
- Scoped State
  - Available only to a selected branch of the app's tree and positioned on the upper common node to all served child nodes
  - Reserved for data that has to be accessed on different nesting levels, but is not needed app-whide.
  - This pattern should be avoided for data that updates too frequently.
  - Handled with [React Context API](https://reactjs.org/docs/context.html)
- Local State
  - Located on the component level
  - Handled with the `useState` hook

### Syncing State Between Non-connected Components

Use the pub-sub (aka observer) pattern for this. Remember to always unsubscribe from all subscriptions once they are no longer needed.

The pub-sub implementation should be used from the `utilities` folder.
