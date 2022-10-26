import { Card, Select, Text, Well } from 'design';
import { DesignContext } from 'design/DesignContext';
import { DesignSystem } from 'design/enums/design-system.enum';
import { ThemeMode } from 'design/enums/theme-mode.enum';
import { LanguageSelector } from 'examples/components/LanguageSelector/LanguageSelector';
import { UserDto } from 'examples/dtos/user.dto';
import { genericErrorHandler } from 'helpers/error.helpers';
import { Align } from 'layout';
import { FC, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { http } from 'utilities/http/http';
import { ResponseValidator } from 'utilities/http/validator/response-validator.class';
import { intl } from 'utilities/i18n/intl.utility';

const StyledPre = styled.pre`
  font-size: ${({ theme }) => theme.components.text.p.fontSize / 1.5}rem;
  color: ${({ theme }) => theme.components.text.p.color.main};
`;

export const Home: FC = () => {
  const designContext = useContext(DesignContext);

  useEffect(() => {
    http
      .get<UserDto[]>(
        'https://jsonplaceholder.typicode.com/users',
        new ResponseValidator(UserDto, {
          validateList: true,
        }),
      )
      .then((users) =>
        console.log('users:', users.map((item) => item.name).join(', ')),
      )
      .catch(genericErrorHandler);
  }, []);

  return (
    <>
      <Text.h2>
        {intl.translate(
          {
            id: 'Welcome to the <a>SpaceDev</a> <abbr>CRA</abbr> template',
          },
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

      <br />

      <Card.Base>
        <Card.Heading>{intl.translate({ id: 'Making Requests' })}</Card.Heading>

        <Card.Body>
          <Text.p>
            {intl.translate({
              id: "As part of this page's load we make a request to a mockup endpoint.",
            })}
          </Text.p>

          <Text.p>
            {intl.translate({
              id: 'In order to make sure the response data fulfill the expectations we have about its structure and typing we use a response validator.',
            })}
          </Text.p>

          <Text.p>
            {intl.translate({
              id: 'If you open the console you should see something like this:',
            })}
          </Text.p>

          <br />

          <Well>
            <StyledPre>
              <code>
                {`users: Leanne Graham, Ervin Howell, Clementine Bauch, Patricia Lebsack, Chelsey Dietrich,
Mrs. Dennis Schulist, Kurtis Weissnat, Nicholas Runolfsdottir V, Glenna Reichert, Clementina DuBuque`}
              </code>
            </StyledPre>
          </Well>

          <br />

          <Text.p>
            {intl.translate({
              id: 'This is how a request looks like:',
            })}
          </Text.p>

          <br />

          <Well>
            <StyledPre>
              <code>
                {`
useEffect(() => {
  http
    .get<UserDto[]>(
      'https://jsonplaceholder.typicode.com/users',
      new ResponseValidator(UserDto, {
        validateList: true,
      }),
    )
    .then((users) =>
      console.log('users:', users.map((item) => item.name).join(', ')),
    )
    .catch(genericErrorHandler);
}, []);
    `}
              </code>
            </StyledPre>
          </Well>

          <br />

          <Text.p>
            {intl.translate(
              {
                id: '<strong>User</strong> DTO:',
              },
              {
                strong: (label) => <strong>{label}</strong>,
              },
            )}
          </Text.p>

          <br />

          <Well>
            <StyledPre>
              <code>
                {`
import { IsEmail, IsNumber, IsString, ValidateNested } from 'class-validator';
import { BaseDto } from 'utilities/http/base.dto';
import { AddressDto } from './address.dto';
import { CompanyDto } from './company.dto';

export class UserDto extends BaseDto {
  @IsNumber()
  id!: number;

  @IsString()
  name!: string;

  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @ValidateNested()
  address!: AddressDto;

  @IsString()
  phone!: string;

  @IsString()
  website!: string;

  @ValidateNested()
  company!: CompanyDto;

  constructor(data: any) {
    super();

    Object.assign(this, data);

    this.address = new AddressDto(data.address);
    this.company = new CompanyDto(data.company);
  }
}
`}
              </code>
            </StyledPre>
          </Well>
        </Card.Body>
      </Card.Base>
    </>
  );
};
