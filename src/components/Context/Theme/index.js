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
  theme: PropTypes.shape(PropTypes.any),
  children: PropTypes.func.isRequired
};

export { ThemeContext, ThemeProvider };
