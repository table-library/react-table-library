import * as React from 'react';
import PropTypes from 'prop-types';

const TableContext = React.createContext(null);

const TableProvider = ({ list, onTableStateChange, children }) => {
  const tableFeatureRef = React.useRef();

  return (
    <TableContext.Provider
      value={{
        list,
        onTableStateChange,
        tableFeatureRef
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

TableProvider.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any),
  onTableStateChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { TableProvider, TableContext };
