import * as React from 'react';
import PropTypes from 'prop-types';

import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';

const headerRow = `
  position: sticky;
  top: 0;
  z-index: 4;
`;

const Header = ({ children }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <div
      role="rowgroup"
      className="thead"
      css={`
        ${headerRow}
        ${theme?.Header}
      `}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child)
      )}
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { Header };
