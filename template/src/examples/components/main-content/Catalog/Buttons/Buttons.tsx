import { Button, Card, Text } from 'design';
import { FC } from 'react';
import styled from 'styled-components';
import { intl } from 'utilities/i18n/intl.utility';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: auto repeat(8, 1fr);
  gap: 1rem;
  align-items: center;
`;

const yellow = {
  main: '#FFB003',
  dark: '#FFB003',
  light: '#FFB003',
  invert: '#fff',
};

export const Buttons: FC = () => {
  return (
    <Card.Base>
      <Card.Heading h2>{intl.translate({ id: 'Buttons' })}</Card.Heading>

      <Card.Body>
        <StyledGrid>
          <Text.p>Default</Text.p>

          <Button>Default</Button>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="error">Error</Button>
          <Button color="info">Info</Button>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
          <Button color={yellow}>Custom</Button>

          <Text.p>Outlined</Text.p>

          <Button variant="outlined">Default</Button>
          <Button variant="outlined" color="primary">
            Primary
          </Button>
          <Button variant="outlined" color="secondary">
            Secondary
          </Button>
          <Button variant="outlined" color="error">
            Error
          </Button>
          <Button variant="outlined" color="info">
            Info
          </Button>
          <Button variant="outlined" color="success">
            Success
          </Button>
          <Button variant="outlined" color="warning">
            Warning
          </Button>
          <Button variant="outlined" color={yellow}>
            Custom
          </Button>

          <Text.p>Filled</Text.p>

          <Button variant="filled">Default</Button>
          <Button variant="filled" color="primary">
            Primary
          </Button>
          <Button variant="filled" color="secondary">
            Secondary
          </Button>
          <Button variant="filled" color="error">
            Error
          </Button>
          <Button variant="filled" color="info">
            Info
          </Button>
          <Button variant="filled" color="success">
            Success
          </Button>
          <Button variant="filled" color="warning">
            Warning
          </Button>
          <Button variant="filled" color={yellow}>
            Custom
          </Button>
        </StyledGrid>
      </Card.Body>
    </Card.Base>
  );
};
