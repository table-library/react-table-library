import * as React from 'react';
import PropTypes from 'prop-types';

const TableContext = React.createContext(null);

const TableProvider = ({ list, children }) => {
  return (
    <TableContext.Provider
      value={{
        list
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

TableProvider.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any),
  children: PropTypes.node.isRequired
};

export { TableProvider, TableContext };
