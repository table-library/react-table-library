import * as React from 'react';
import PropTypes from 'prop-types';

const ResizeContext = React.createContext(false);

const ResizeProvider = ({ resize, tableRef, children }) => {
  const resizedWidths = React.useRef();

  return (
    <ResizeContext.Provider
      value={{ resize, resizedWidths, tableRef }}
    >
      {children}
    </ResizeContext.Provider>
  );
};

ResizeProvider.propTypes = {
  resize: PropTypes.bool,
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
