Create React App Starter Template by:

[![SpaceDev](https://uploads-ssl.webflow.com/61e097dd988731696768be21/62042f55a072ef02ab1d11a2_logo%20del%20mismo%20taman%CC%83o%20que%20el%20texto.svg)](https://www.spacedev.io/)

# Upcoming

## To Do

- breakpoints
- inputs
  - checkbox
  - toggle / switch
  - radio
  - autocomplete
- badge

## Nice to have

- useBreakpoint hook

# Basic

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**Available Scripts:**

In the project directory, you can run:

```bash
yarn start # Runs the app in the development mode

yarn test # Launches the test runner in the interactive watch mode

yarn build # Builds the app for production to the build folder

yarn serve # Opens the production version on the default browser
```

**Learn More:**

- You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- To learn React, check out the [React documentation](https://reactjs.org/).

## Environment Configuration

**.env**

```bash
REACT_APP_API_URL=http://localhost:5000
# sets the target for the API calls, by default it will be the same domain in which the app is loaded

REACT_APP_VALIDATION_ERROR_BREAKS_RESPONSE=false
# controls whether the validation errors will stop the response from reaching the request point
```

## Project Cleanup

- `template/src/App.tsx`

```diff
- import { AppBar } from 'examples/components/AppBar/AppBar';
- import { Router } from 'examples/Router';
import { useContext } from 'react';
- import styled from 'styled-components';
import { IntlContext } from 'utilities/i18n/IntlContext';

- const StyledDiv = styled.div`
-   padding: 2rem;
-   background-color: ${({ theme }) => theme.background.back};
-   min-height: 100vh;
-
-   a {
-     color: ${({ theme }) => theme.palette.primary.main};
-   }
- `;

function App() {
  // necessary to force a render when locale is updated
  useContext(IntlContext);

-  return (
-    <StyledDiv>
-      <AppBar />
-
-      <main>
-        <Router />
-      </main>
-    </StyledDiv>
-  );
+ return <YourNewAppStructure/ >
}

export default App;
```

## Topics

- [Best Practices](./docs/BEST_PRACTICES.md)
- [Theme](./docs/THEME.md)
- [HTTP requests and Validation](./docs/HTTP.md)
- [Fonts](./docs/FONTS.md)
- [Icons](./docs/ICONS.md)

# Advanced

> **Note:** if you can't make sense of what's detailed here you shouoldn't be making decisions regarding the following subjects

## State Management

**What is State?**

- The _state_ is the business-related data.
- No UI related data (the app theme is an exception here)
- No error handling
- ...

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

**Syncing State Between Non-connected Components**

Use the pub-sub (aka observer) pattern for this. Remember to always unsubscribe from all subscriptions once they are no longer needed.

The pub-sub implementation should be used from the `utilities` folder.

## Blockchain Integration

- **Supported networks**

  - In order to change the supported networks, change the array inside each injector and then if the network is in there it will work as desired otherwise a error toast will show.
  - Under the same folder, inside the networks file is where you need to add your supported networks so when the user changes the network it changes on the wallet or otherwise if the network is not already added it takes the information from there to add it to the wallet.

- **Connection to wallet**

  - Once inside the connectModal component is where we map all the possible wallets to connect to the app. We use the activate method from useWeb3react in order to inject the provider for each case, we also save the connection method in the local in order to reconnect the wallet when refreshing.

- **Wrong networks**

  - In order to know whether a network is valid or not we use the error property from useWeb3react that return an error message with the supported networks whenever the user changes to a non-supported netwok.

- **Change networks**

  - To trigger the network change from inside the app we use the library.provider.request method from object library taken again from web3React and send the wallet_switchEthereumChain string. In case the network is already added this will open the change network modal, otherwise it will return am error and in the catch we will send wallet_addEthereumChain string and add the chain with information from the networks file. This is a helper function in which you have to pass the library object from web3React and the name of the chain you want to change to
