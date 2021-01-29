import * as React from 'react';
import PropTypes from 'prop-types';

const ResizeContext = React.createContext(false);

const ResizeProvider = ({ tableRef, children }) => {
  const resizedLayout = React.useRef();

  const value = React.useMemo(() => ({ resizedLayout, tableRef }), [
    resizedLayout,
    tableRef
  ]);

  return (
    <ResizeContext.Provider value={value}>
      {children}
    </ResizeContext.Provider>
  );
};

ResizeProvider.propTypes = {
  tableRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { ResizeContext, ResizeProvider };
