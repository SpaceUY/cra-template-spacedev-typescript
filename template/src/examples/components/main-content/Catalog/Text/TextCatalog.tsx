import { Card, Text } from 'design';
import { FC } from 'react';
import { intl } from 'utilities/i18n/intl.utility';

const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export const TextCatalog: FC = () => {
  return (
    <Card.Base>
      <Card.Heading h2>{intl.translate({ id: 'Text' })}</Card.Heading>

      <Card.Body>
        {headingLevels.map((level) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const HeadingComp = Text[level] as any;

          const levelLabel = intl.translate(
            { id: 'Heading {level}' },
            { level },
          );

          return (
            <HeadingComp key={level}>
              {levelLabel} <strong>{levelLabel}</strong>{' '}
              <small>{levelLabel}</small>
            </HeadingComp>
          );
        })}

        <Text.p>
          {intl.translate(
            {
              id: 'Paragraph <strong>Paragraph</strong> <small>Paragraph</small>',
            },
            {
              strong: (label) => <strong>{label}</strong>,
              small: (label) => <small>{label}</small>,
            },
          )}
        </Text.p>

        <Text.label>
          {intl.translate(
            {
              id: 'Label <strong>Label</strong> <small>Label</small>',
            },
            {
              strong: (label) => <strong>{label}</strong>,
              small: (label) => <small>{label}</small>,
            },
          )}
        </Text.label>
      </Card.Body>
    </Card.Base>
  );
};
