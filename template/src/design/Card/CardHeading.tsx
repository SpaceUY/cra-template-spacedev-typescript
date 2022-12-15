import { Text } from 'design/Text';
import { isString } from 'helpers/nodash.helpers';
import { FC, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { FcDefaultProps } from 'types/fc-default-props';

export const cardHeadingStyles = css`
  font-size: 1.2rem;
  font-weight: 400;
`;

const StyledH1 = styled(Text.h1)`
  ${cardHeadingStyles}
`;

const StyledH2 = styled(Text.h2)`
  ${cardHeadingStyles}
`;

const StyledH3 = styled(Text.h3)`
  ${cardHeadingStyles}
`;

const StyledH4 = styled(Text.h4)`
  ${cardHeadingStyles}
`;

const StyledH5 = styled(Text.h5)`
  ${cardHeadingStyles}
`;

const StyledH6 = styled(Text.h6)`
  ${cardHeadingStyles}
`;

const StyledHeadings = [
  StyledH1,
  StyledH2,
  StyledH3,
  StyledH4,
  StyledH5,
  StyledH6,
];

const StyledCardHeaderDiv = styled.div`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.light};
`;

type Props = FcDefaultProps & {
  component?: 'div' | 'span' | 'region' | 'article' | 'header' | 'footer';
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
};

function getHeadingLevel(
  h1 = false,
  h2 = false,
  h3 = true,
  h4 = false,
  h5 = false,
  h6 = false,
): 1 | 2 | 3 | 4 | 5 | 6 {
  switch (true) {
    case h1:
      return 1;
    case h2:
      return 2;
    case h3:
      return 3;
    case h4:
      return 4;
    case h5:
      return 5;
    case h6:
      return 6;

    default:
      return 3;
  }
}

export const CardHeading: FC<Props> = ({
  children,
  component,
  h1 = false,
  h2 = false,
  h3 = false,
  h4 = false,
  h5 = false,
  h6 = false,
  ...rest
}) => {
  const level = useMemo(() => {
    return getHeadingLevel(h1, h2, h3, h4, h5, h6);
  }, [h1, h2, h3, h4, h5, h6]);

  const HeadingComponent = StyledHeadings[level - 1];

  if (isString(children)) {
    return (
      <StyledCardHeaderDiv as={component} {...rest}>
        <HeadingComponent>{children}</HeadingComponent>
      </StyledCardHeaderDiv>
    );
  }

  return <StyledCardHeaderDiv as={component}>{children}</StyledCardHeaderDiv>;
};
