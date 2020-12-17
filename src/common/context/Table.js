import * as React from 'react';
import PropTypes from 'prop-types';

const TableContext = React.createContext(null);

const TableProvider = ({ data, onTableStateChange, children }) => {
  const tableFeatureRef = React.useRef();

  return (
    <TableContext.Provider
      value={{
        data,
        onTableStateChange,
        tableFeatureRef
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

TableProvider.propTypes = {
  data: PropTypes.shape(PropTypes.any),
  onTableStateChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { TableProvider, TableContext };
