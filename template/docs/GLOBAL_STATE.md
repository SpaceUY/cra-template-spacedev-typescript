Create React App Starter Template by:

[![SpaceDev](https://uploads-ssl.webflow.com/61e097dd988731696768be21/62042f55a072ef02ab1d11a2_logo%20del%20mismo%20taman%CC%83o%20que%20el%20texto.svg)](https://www.spacedev.io/)

**[Go Back](../README.md)**

# Global State with Redux

To enable the use of global state you need to import the `GlobalStateProvider` component and use it in `App.jsx`.

```diff
-import { ExampleGlobalStateProvider } from 'examples/global-state';
+import { GlobalStateProvider } from 'global-state';

  return (
-   <ExampleGlobalStateProvider>
+   <GlobalStateProvider>
     <StyledDiv>
       <AppBar />
       <main>
         <Router />
       </main>
     </StyledDiv>
-   </ExampleGlobalStateProvider>
+   </GlobalStateProvider>
  );
```

Then you can follow the example you just remove to add new reducers and such.
