import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ThemeContext } from '@context';

const BodyContainer = styled.div`
  ${({ css }) => css};
`;

const Body = ({ children }) => {
  const theme = React.useContext(ThemeContext);

  return <BodyContainer css={theme?.Body}>{children}</BodyContainer>;
};

Body.propTypes = {
  children: PropTypes.node.isRequired
};

export { Body };
