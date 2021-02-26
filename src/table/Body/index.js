import * as React from 'react';
import PropTypes from 'prop-types';

import { SelectContext } from '@table-library/react-table-library/lib/common/context/Select';
import { TreeContext } from '@table-library/react-table-library/lib/common/context/Tree';
import { PanelContext } from '@table-library/react-table-library/lib/common/context/Panel';

const Body = ({ children }) => {
  const select = React.useContext(SelectContext);
  const tree = React.useContext(TreeContext);
  const panels = React.useContext(PanelContext);

  const getRowProps = (props) =>
    [select, tree]
      .filter(Boolean)
      .filter((feature) => feature._getRowProps)
      .map((feature) =>
        feature._getRowProps(props, {
          select,
          tree,
          // others // TODO
        })
      );

  const getPanels = (props, index) =>
    (panels || [])
      .map((panel) => panel(props, index))
      .filter(Boolean);

  return (
    <>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          rowPropsByFeature: getRowProps(child.props),
          panels: getPanels(child.props, index),
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
