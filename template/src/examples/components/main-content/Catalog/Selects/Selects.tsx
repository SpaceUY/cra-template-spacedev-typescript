import { Card, Select, Text } from 'design';
import { cardHeadingStyles } from 'design/Card/CardHeading';
import { ColorProp } from 'design/types/color-prop';
import { InputVariantProp } from 'design/types/input-variant-prop';
import { ColorSelector } from 'examples/components/ColorSelector/ColorSelector';
import { VariantSelector } from 'examples/components/VariantSelector/VariantSelector';
import { Align } from 'layout';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { intl } from 'utilities/i18n/intl.utility';

const StyledH2 = styled(Text.h2)`
  ${cardHeadingStyles}
`;

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => ({
  label: intl.translate({ id: 'Option {index}' }, { index }),
  value: index,
}));

export const Selects: FC = () => {
  const [value, setValue] = useState(options[0].value);
  const [color, setColor] = useState<ColorProp | undefined>();
  const [variant, setVariant] = useState<InputVariantProp>('default');

  return (
    <Card.Base>
      <Card.Heading>
        <Align v-center gap={1}>
          <StyledH2>{intl.translate({ id: 'Select' })}</StyledH2>

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
        <Select
          label="Demo Select"
          name="demo-select"
          options={options}
          value={value}
          onChange={(evt) => setValue(evt.target.value)}
          color={color}
          variant={variant}
        />
      </Card.Body>
    </Card.Base>
  );
};
