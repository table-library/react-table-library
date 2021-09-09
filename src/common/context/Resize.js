import * as React from 'react';
import PropTypes from 'prop-types';

const ResizeContext = React.createContext({});

const ResizeProvider = ({ tableRef, layout, children }) => {
  const resizedLayout = React.useRef([]);

  const value = React.useMemo(
    () => ({ layout, resizedLayout, tableRef }),
    [layout, resizedLayout, tableRef]
  );

  return (
    <ResizeContext.Provider value={value}>
      {children}
    </ResizeContext.Provider>
  );
};

ResizeProvider.propTypes = {
  tableRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  layout: PropTypes.shape({
    custom: PropTypes.bool,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { ResizeContext, ResizeProvider };
