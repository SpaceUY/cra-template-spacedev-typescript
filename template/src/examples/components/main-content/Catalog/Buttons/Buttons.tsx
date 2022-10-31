import { Button, Card, Text } from 'design';
import { InlineCode } from 'design/InlineCode/InlineCode';
import { ColorProp } from 'design/types/color-prop';
import { InputVariantProp } from 'design/types/input-variant-prop';
import { ColorSelector } from 'examples/components/ColorSelector/ColorSelector';
import { StyledH2 } from 'examples/components/main-content/Catalog/catalog.styled';
import { VariantSelector } from 'examples/components/VariantSelector/VariantSelector';
import { Align } from 'layout';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { intl } from 'utilities/i18n/intl.utility';

const StyledAlign = styled(Align)`
  width: fit-content;
`;

const StyledGridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 1rem;
  align-items: center;
  justify-items: start;
`;

export const Buttons: FC = () => {
  const [color, setColor] = useState<ColorProp | undefined>();
  const [variant, setVariant] = useState<InputVariantProp>('default');

  return (
    <Card.Base>
      <Card.Heading>
        <Align v-center gap={1}>
          <StyledH2>{intl.translate({ id: 'Buttons' })}</StyledH2>

          <ColorSelector
            value={color}
            onChange={(evt) => setColor(evt.target.value)}
          />

          <VariantSelector
            value={variant}
            onChange={(evt) => setVariant(evt.target.value)}
          />
        </Align>
      </Card.Heading>

      <Card.Body>
        <StyledAlign column gap={1}>
          <Text.h3>
            {intl.translate({
              id: 'Standard Buttons',
            })}
          </Text.h3>

          <StyledGridDiv>
            <Text.p>Small</Text.p>
            <Text.p>Medium</Text.p>
            <Text.p>Large</Text.p>
            <Text.p>Custom 40px</Text.p>

            <Button color={color} variant={variant} small>
              {intl.translate({ id: '{variant} button' }, { variant })}
            </Button>

            <Button color={color} variant={variant} medium>
              {intl.translate({ id: '{variant} button' }, { variant })}
            </Button>

            <Button color={color} variant={variant} large>
              {intl.translate({ id: '{variant} button' }, { variant })}
            </Button>

            <InlineCode>NULL</InlineCode>
          </StyledGridDiv>
        </StyledAlign>
      </Card.Body>
    </Card.Base>
  );
};
