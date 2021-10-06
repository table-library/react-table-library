import * as React from 'react';
import PropTypes from 'prop-types';

const style = `
  overflow-x: hidden;
`;

const Body = ({ children }) => {
  return <div css={style}>{children}</div>;
};

Body.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { Body };
