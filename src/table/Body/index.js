import * as React from 'react';
import PropTypes from 'prop-types';

import { TableContext } from '@table-library/react-table-library/common/context/Table';
import { PanelContext } from '@table-library/react-table-library/common/context/Panel';
import { SelectContext } from '@table-library/react-table-library/common/context/Select';
import { TreeContext } from '@table-library/react-table-library/common/context/Tree';

const getPanels = (panels, props, data) =>
  (panels || []).map((panel) => panel(props, data)).filter(Boolean);

const getRowProps = (features, props) =>
  Object.values(features)
    .filter(Boolean)
    .filter((feature) => feature._getRowProps)
    .map((feature) => feature._getRowProps(props, features));

const Body = ({ children }) => {
  const data = React.useContext(TableContext);
  const select = React.useContext(SelectContext);
  const tree = React.useContext(TreeContext);
  const panels = React.useContext(PanelContext);

  const features = {
    select,
    tree,
    // others
  };

  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          rowPropsByFeature: getRowProps(features, child.props),
          panels: getPanels(panels, child.props, data),
        })
      )}
    </>
  );
};

Body.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { Body };
