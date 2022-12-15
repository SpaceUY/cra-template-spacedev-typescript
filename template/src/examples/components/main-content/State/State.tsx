import { Card, List, ListItem, Text } from 'design';
import { InlineCode } from 'design/InlineCode/InlineCode';
import { FC } from 'react';
import { intl } from 'utilities/i18n/intl.utility';

export const State: FC = () => {
  return (
    <>
      <Card.Base>
        <Card.Heading h2>{intl.translate({ id: 'Intro' })}</Card.Heading>
        <Card.Body>
          <Text.h3>{intl.translate({ id: 'What is State?' })}</Text.h3>

          <br />

          <List>
            <ListItem>
              {intl.translate(
                {
                  id: 'The <i>state</i> is the business-related data.',
                },
                { i: (label) => <i>{label}</i> },
              )}
            </ListItem>

            <ListItem>
              {intl.translate({
                id: 'No UI related data (the app theme is an exception here).',
              })}
            </ListItem>

            <ListItem>
              {intl.translate({
                id: 'No error handling.',
              })}
            </ListItem>
          </List>

          <br />

          <Text.p>
            {intl.translate({
              id: 'We indentified 3 different types or levels of state.',
            })}
          </Text.p>

          <br />

          <List>
            <ListItem>
              {intl.translate({
                id: 'Global State',
              })}

              <List>
                <ListItem>
                  {intl.translate({
                    id: 'Accessible throughout the whole app.',
                  })}
                </ListItem>

                <ListItem>
                  {intl.translate({
                    id: "Reserved for data that we want to fetch as little as possible. e.g.: authenticated user's data, app theme, etc.",
                  })}
                </ListItem>

                <ListItem>
                  {intl.translate(
                    {
                      id: 'Handled by default with <a>Redux,https://redux.js.org</a> and <a>Redux-Toolkit,https://redux-toolkit.js.org</a>.',
                    },
                    {
                      a: (commaSeparatedData) => {
                        if (typeof commaSeparatedData[0] === 'string') {
                          const [label, href] =
                            commaSeparatedData[0].split(',');

                          return (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {label}
                            </a>
                          );
                        }
                      },
                    },
                  )}
                </ListItem>
              </List>
            </ListItem>

            <ListItem>
              {intl.translate({
                id: 'Scoped State',
              })}

              <List>
                <ListItem>
                  {intl.translate({
                    id: "Available only to a selected branch of the app's tree and positioned on the upper common node to all served child nodes.",
                  })}
                </ListItem>

                <ListItem>
                  {intl.translate({
                    id: 'Reserved for data that has to be accessed on different nesting levels, but is not needed app-whide.',
                  })}
                </ListItem>

                <ListItem>
                  {intl.translate({
                    id: 'This pattern should be avoided for data that updates too frequently.',
                  })}
                </ListItem>

                <ListItem>
                  {intl.translate(
                    {
                      id: 'Handled with <a>React Context API,https://reactjs.org/docs/context.html</a>.',
                    },
                    {
                      a: (commaSeparatedData) => {
                        if (typeof commaSeparatedData[0] === 'string') {
                          const [label, href] =
                            commaSeparatedData[0].split(',');

                          return (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {label}
                            </a>
                          );
                        }
                      },
                    },
                  )}
                </ListItem>
              </List>
            </ListItem>

            <ListItem>
              {intl.translate({
                id: 'Component State',
              })}

              <List>
                <ListItem>
                  {intl.translate({
                    id: 'Located on the component level.',
                  })}
                </ListItem>

                <ListItem>
                  {intl.translate(
                    {
                      id: 'Handled with the <code>useState</code> hook.',
                    },
                    { code: (label) => <InlineCode>{label}</InlineCode> },
                  )}
                </ListItem>
              </List>
            </ListItem>
          </List>
        </Card.Body>
      </Card.Base>

      <br />

      <Card.Base>
        <Card.Heading h2>{intl.translate({ id: 'Global State' })}</Card.Heading>
        <Card.Body></Card.Body>
      </Card.Base>
    </>
  );
};
