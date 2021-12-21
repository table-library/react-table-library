import * as React from 'react';
import PropTypes from 'prop-types';

const LayoutContext = React.createContext({});

const LayoutProvider = ({
  tableElementRef,
  tableMemoryRef,
  layout,
  children,
}) => {
  const value = React.useMemo(
    () => ({
      layout,
      tableElementRef,
      tableMemoryRef,
    }),
    [layout, tableElementRef, tableMemoryRef]
  );

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
};

LayoutProvider.propTypes = {
  tableElementRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  tableMemoryRef: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.shape({ current: PropTypes.any }),
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

export { LayoutContext, LayoutProvider };
