Create React App Starter Template by:

[![SpaceDev](https://uploads-ssl.webflow.com/61e097dd988731696768be21/62042f55a072ef02ab1d11a2_logo%20del%20mismo%20taman%CC%83o%20que%20el%20texto.svg)](https://www.spacedev.io/)

# Upcoming

- force theme
- force locale
- breackpoints
- input invert
- date handling
- config

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

## Styled Components

**Naming Scheme**

`Styled` + `OptionalDescription` + `HtmlElementName_OR_ComponentBeingExtended`

**Examples:**

```typescript
// navite components
const StyledDiv = styled.div;
const StyledP = styled.p;
```

```typescript
// custom components
const StyledButton = styled(Button);
const StyledModalFooter = styled(ModalFooter);
```

If you are styling multiple elements of the same type or think one needs some clarification then you should include an OptionalDescription

**Examples:**

```typescript
const StyledFooDiv = styled.div;
const StyledBarDiv = styled.div;
const StyledBatDiv = styled.div;
```

This structure immediately lets any reader know:

- this is not a component with any functionality, it is only being named for style purposes
- what type of native element is being used to prevent any html semantic mistakes

## Using the theme

If you need to use a `theme` value inside of a component, use the `useTheme` hook from `design/hooks/useTheme` instead of importing theme directly.

The `useTheme` hooks pulls directly from the `DesignProvider`, which will enable global changes to theme across the application without needing to refresh the page. `DesignProvider` is the source of truth for the app.

```typescript
// Bad
import { theme } from '...';

function MyComponent() {
  return <Comp color={theme.palette.primary} />;
}

// Good
import { useTheme } from 'design/hooks/useTheme';

function MyComponent() {
  const theme = useTheme();

  return <Comp color={theme.palette.primary} />;
}
```

For `styled-components`, use the injected theme:

```typescript
// Bad
import { theme } from '...';

const StyledDiv = styled.div`
  color: ${theme.baseColors.someColor};
`;

// Good
const StyledDiv = styled.div`
  color: ${({ theme }) => theme.baseColors.someColor};
`;
```

## [HTTP requests](./docs/HTTP.md)

## [Fonts](./docs/FONTS.md)

## Icons

**Material Icons**

- Get from https://mui.com/material-ui/material-icons/
- Follow [this example](./src/examples/components/main-content/Catalog/Icons/icons/ClipboardIcon.tsx)

**Feather Icons**

- Get from https://feathericons.com/
- Follow [this example](./src/examples/components/main-content/Catalog/Icons/icons/NotificationIcon.tsx)

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
