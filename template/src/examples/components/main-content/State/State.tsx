import { Card, List, ListItem, Text } from 'design';
import { useTheme } from 'design/hooks/use-theme';
import { InlineCode } from 'design/InlineCode/InlineCode';
import { FC } from 'react';
import { intl } from 'utilities/i18n/intl.utility';
import { GlobalCounterDisplay } from './GlobalCounterDisplay';
import { GlobalCounterForm } from './GlobalCounterForm';
import { ScopedStateConsumer } from './ScopedStateConsumer';
import { ScopedStateProvider } from './ScopedStateProvider';

export const State: FC = () => {
  const theme = useTheme();

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
                id: 'No UI related data (the app theme is an exception here, for now).',
              })}
            </ListItem>

            <ListItem>
              {intl.translate({
                id: 'No error handling.',
              })}
            </ListItem>

            <ListItem>
              {intl.translate({
                id: 'No fetching logic.',
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
                    id: 'Reserved for data that has to be accessed on different nesting levels, but is not needed app-wide.',
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
                  *
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

          <br />

          <Text.p>
            <small>
              *
              {intl.translate(
                {
                  id: "<strong>Note:</strong> there is no hard limit in which we know to stop doing prop drilling and start using a Context, every developer will have to use it's own criteria at this point.",
                },
                { strong: (label) => <strong>{label}</strong> },
              )}
            </small>
          </Text.p>
        </Card.Body>
      </Card.Base>

      <br />

      <Card.Base>
        <Card.Heading h2>{intl.translate({ id: 'Global State' })}</Card.Heading>
        <Card.Body>
          <Text.h3>{intl.translate({ id: 'The Humble Counter' })}</Text.h3>

          <br />

          <Text.p>
            {intl.translate({
              id: 'Submiting the following form will update the counter value globally and the value will be reflected here: ',
            })}
          </Text.p>

          <GlobalCounterDisplay />

          <br />

          <GlobalCounterForm />
        </Card.Body>
      </Card.Base>

      <br />

      <Card.Base>
        <Card.Heading h2>{intl.translate({ id: 'Scoped State' })}</Card.Heading>
        <Card.Body>
          <Text.h3>{intl.translate({ id: 'Nesting Contexts' })}</Text.h3>

          <br />

          <Text.p>
            {intl.translate({
              id: "Using a Context means that the Context API will do a lookup up the component's tree and use the first one available.",
            })}
          </Text.p>

          <br />

          <Text.p>
            {intl.translate({
              id: "This means that we can nest providers and by doing that change the Context its children will use, even if up the component's tree we have already placed another Provider.",
            })}
          </Text.p>

          <br />

          <Text.p>
            {intl.translate({
              id: 'In the following example you will notice that, even though we use the same consumer component, each one will have different values, and the changes triggered on any given level will only affect such level.',
            })}
          </Text.p>

          <ScopedStateProvider
            value={{
              providerName: intl.translate({ id: 'First Level' }),
              level: 1,
              color: theme.palette.primary,
            }}
          >
            <ScopedStateConsumer>
              <ScopedStateProvider
                value={{
                  providerName: intl.translate({ id: 'Second Level' }),
                  level: 2,
                  color: theme.palette.secondary,
                }}
              >
                <ScopedStateConsumer>
                  <ScopedStateProvider
                    value={{
                      providerName: intl.translate({
                        id: 'Third Level',
                      }),
                      level: 3,
                      color: theme.palette.warning,
                    }}
                  >
                    <ScopedStateConsumer />
                  </ScopedStateProvider>
                </ScopedStateConsumer>
              </ScopedStateProvider>
            </ScopedStateConsumer>
          </ScopedStateProvider>
        </Card.Body>
      </Card.Base>
    </>
  );
};
