import { Text, TextInput } from 'design';
import { FC, useState } from 'react';
import { intl } from 'utilities/i18n/intl.utility';

export const LocalStateExample: FC = () => {
  const [text, setText] = useState(
    intl.translate({
      id: "Local state can't be reached outside of the component",
    }),
  );

  return (
    <>
      <Text.h3>
        {text
          ? text
          : intl.translate({ id: 'Type anything in the input below' })}
      </Text.h3>

      <br />

      <TextInput
        label={intl.translate({ id: 'Text for header above' })}
        value={text}
        onChange={(evt) => setText(evt.target.value)}
        name="text"
        variant="outlined"
      />
    </>
  );
};
