import { Card, Text } from 'design';
import { cardHeadingStyles } from 'design/Card/CardHeading';
import { ColorProp } from 'design/types/color-prop';
import { ColorSelector } from 'examples/components/ColorSelector/ColorSelector';
import { ClipboardIcon } from 'examples/components/main-content/Catalog/Icons/icons/ClipboardIcon';
import { Align } from 'layout';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { intl } from 'utilities/i18n/intl.utility';
import { NotificationIcon } from './icons/NotificationIcon';

const StyledH2 = styled(Text.h2)`
  ${cardHeadingStyles}
`;

const StyledGridDiv = styled.div`
  max-width: 500px;
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 1rem;
`;

export const Icons: FC = () => {
  const [color, setColor] = useState<ColorProp | undefined>();

  return (
    <Card.Base>
      <Card.Heading>
        <Align v-center gap={1}>
          <StyledH2>{intl.translate({ id: 'Icons' })}</StyledH2>

          <ColorSelector
            value={color}
            onChange={(evt) => setColor(evt.target.value)}
          />
        </Align>
      </Card.Heading>

      <Card.Body>
        <Text.h3>Material Icons</Text.h3>

        <StyledGridDiv>
          <Text.p>Small</Text.p>
          <Text.p>Medium</Text.p>
          <Text.p>Large</Text.p>
          <Text.p>Custom 40px</Text.p>

          <ClipboardIcon color={color} small />
          <ClipboardIcon color={color} />
          <ClipboardIcon color={color} large />
          <ClipboardIcon color={color} size={64} />
        </StyledGridDiv>

        <Text.h3>Feather Icons</Text.h3>

        <StyledGridDiv>
          <Text.p>Small</Text.p>
          <Text.p>Medium</Text.p>
          <Text.p>Large</Text.p>
          <Text.p>Custom 40px</Text.p>

          <NotificationIcon color={color} small />
          <NotificationIcon color={color} />
          <NotificationIcon color={color} large />
          <NotificationIcon color={color} size={64} />
        </StyledGridDiv>
      </Card.Body>
    </Card.Base>
  );
};
