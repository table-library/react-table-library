import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ThemeContext } from '@context';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  ${({ css }) => css};
`;

const Content = ({ children }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <ContentContainer css={theme?.Content}>
      {children}
    </ContentContainer>
  );
};

Content.propTypes = {
  children: PropTypes.node.isRequired
};

export { Content };
