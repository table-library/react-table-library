import * as React from 'react';
import PropTypes from 'prop-types';

const ThemeContext = React.createContext({});

const ThemeProvider = ({ theme, children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { ThemeContext, ThemeProvider };
