import { Text } from 'design/Text';
import { FC } from 'react';

export const HelperText: FC<{ children: string }> = ({ children }) => {
  return (
    <Text.p>
      <small>{children}</small>
    </Text.p>
  );
};
