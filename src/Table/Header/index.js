import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ThemeContext } from '@common/context/Theme';

const HeaderContainer = styled.div`
  ${({ css }) => css};
`;

const Header = ({ children }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <HeaderContainer
      role="rowgroup"
      className="thead"
      css={theme?.Header}
    >
      {React.Children.map(children, child =>
        React.cloneElement(child, { header: true })
      )}
    </HeaderContainer>
  );
};

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { Header };