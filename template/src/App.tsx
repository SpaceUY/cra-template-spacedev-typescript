import { AppBar } from 'examples/components/AppBar/AppBar';
import { useContext } from 'react';
import { Router } from 'Router';
import styled from 'styled-components';
import { IntlContext } from 'utilities/i18n/IntlContext';
import { Web3ReactProvider } from '@web3-react/core';
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from '@ethersproject/providers';
const StyledDiv = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.background.back};
  min-height: 100vh;

  a {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

function App() {
  // necessary to force a render when locale is updated
  useContext(IntlContext);

  function getLibrary(provider: JsonRpcFetchFunc | ExternalProvider) {
    return new Web3Provider(provider);
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <StyledDiv>
        <AppBar />
        <main>
          <Router />
        </main>
      </StyledDiv>
    </Web3ReactProvider>
  );
}

export default App;
