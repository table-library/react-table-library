import * as React from 'react';
import PropTypes from 'prop-types';

const LayoutContext = React.createContext(false);

const LayoutProvider = ({ layout, children }) => {
  return (
    <LayoutContext.Provider value={{ layout }}>
      {children}
    </LayoutContext.Provider>
  );
};

LayoutProvider.propTypes = {
  layout: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { LayoutContext, LayoutProvider };
