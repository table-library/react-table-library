import * as React from 'react';
import PropTypes from 'prop-types';

const Body = ({ children }) => {
  return <div>{children}</div>;
};

Body.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { Body };
