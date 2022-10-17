import { styled as styledMui, TextField } from '@mui/material';
import { useTheme } from 'design/hooks/useTheme';
import { rgba } from 'helpers/color.helpers';
import { useMemo } from 'react';

const getStyledInvertedTextField = styledMui(TextField);

type Props = Parameters<typeof TextField>[0];

export const MuiTextFieldInvert = (props: Props): JSX.Element => {
  const {
    components: {
      input: {
        invertColor: { main: invertColor },
      },
    },
  } = useTheme();

  const StyledInvertedTextField = useMemo(() => {
    return getStyledInvertedTextField({
      '& label': {
        color: invertColor,
      },
      '& label.Mui-focused': {
        color: invertColor,
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: invertColor,
      },
      '& .MuiInput-underline:hover:before': {
        borderBottomColor: rgba(invertColor, 0.7),
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: invertColor,
      },
      '& .MuiInput-underline:hover:after': {
        borderBottomColor: invertColor,
      },
      '& .MuiFilledInput-underline:before': {
        borderBottomColor: invertColor,
      },
      '& .MuiFilledInput-underline:hover:before': {
        borderBottomColor: `${rgba(invertColor, 0.7)} !important`,
      },
      '& .MuiFilledInput-underline:after': {
        borderBottomColor: invertColor,
      },
      '& .MuiFilledInput-underline:hover:after': {
        borderBottomColor: `${rgba(invertColor, 0.7)} !important`,
      },
      '& input': {
        color: invertColor,
      },
      '& input::placeholder': {
        color: rgba(invertColor, 0.9),
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: invertColor,
        },
        '&:hover fieldset': {
          borderColor: invertColor,
        },
        '&.Mui-focused fieldset': {
          borderColor: invertColor,
        },
      },
      '& .MuiSelect-select': {
        color: invertColor,
      },
      '& .MuiSelect-icon': {
        color: invertColor,
      },
    });
  }, [invertColor]);

  return <StyledInvertedTextField {...props} />;
};
