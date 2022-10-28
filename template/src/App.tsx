import { AppBar } from 'examples/components/AppBar/AppBar';
import { Router } from 'examples/Router';
import { useContext } from 'react';
import styled from 'styled-components';
import { IntlContext } from 'utilities/i18n/intl.context';

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

  return (
    <StyledDiv>
      <AppBar />

      <main>
        <Router />
      </main>
    </StyledDiv>
  );
}

export default App;
