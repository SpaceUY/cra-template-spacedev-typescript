import { Card, Select, Text } from 'design';
import { DesignContext } from 'design/DesignContext';
import { DesignSystem } from 'design/enums/design-system.enum';
import { ThemeMode } from 'design/enums/theme-mode.enum';
import { LanguageSelector } from 'examples/components/LanguageSelector/LanguageSelector';
import { Align } from 'layout';
import { FC, useContext } from 'react';
import { intl } from 'utilities/i18n/intl.utility';

export const Home: FC = () => {
  const designContext = useContext(DesignContext);

  return (
    <>
      <Text.h2>
        {intl.translate(
          { id: 'Welcome to the <a>SpaceDev</a> <abbr>CRA</abbr> template' },
          {
            a: (label) => (
              <a
                href="https://www.spacedev.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            ),
            abbr: (label) => <abbr title="Create React App">{label}</abbr>,
          },
        )}
      </Text.h2>

      <br />

      <Card.Base>
        <Card.Heading>{intl.translate({ id: 'Settings' })}</Card.Heading>

        <Card.Body>
          <Align gap={1}>
            <LanguageSelector />

            <Select
              label={intl.translate({ id: 'Design System' })}
              name="design-system"
              id="design-system-select"
              value={designContext.system}
              options={[
                {
                  label: intl.translate({ id: 'Default Browser Elements' }),
                  value: DesignSystem.DEFAULT,
                },
                {
                  label: intl.translate({ id: 'Material Design Elements' }),
                  value: DesignSystem.MATERIAL_UI,
                },
              ]}
              onChange={(evt) => designContext.setSystem(evt.target.value)}
              variant="outlined"
            />

            <Select
              label={intl.translate({ id: 'Theme' })}
              name="theme"
              id="theme-select"
              value={designContext.theme.mode}
              options={[
                {
                  label: intl.translate({ id: 'Light Theme' }),
                  value: ThemeMode.LIGHT,
                },
                {
                  label: intl.translate({ id: 'Dark Theme' }),
                  value: ThemeMode.DARK,
                },
              ]}
              onChange={(evt) => designContext.setTheme(evt.target.value)}
              variant="outlined"
            />
          </Align>
        </Card.Body>
      </Card.Base>
    </>
  );
};
