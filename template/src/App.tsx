import { AppBar } from 'examples/components/AppBar/AppBar';
import { useContext } from 'react';
import { Router } from 'Router';
import styled from 'styled-components';
import { IntlContext } from 'utilities/i18n/IntlContext';

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
