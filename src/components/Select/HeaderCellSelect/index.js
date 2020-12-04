import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { isFunction } from '@util/isFunction';
import { SelectContext } from '@context';
import { HeaderCell } from '@table';
import { Checkbox } from '@shared/Checkbox';

const ImperativeCheckbox = ({ children }) => {
  const select = React.useContext(SelectContext);
  const { selectState, onSelectAll } = React.useContext(
    SelectContext
  );

  const ref = node => {
    if (!node) return;

    if (selectState.allSelected) {
      node.indeterminate = false;
      node.checked = true;
    } else if (selectState.noneSelected) {
      node.indeterminate = false;
      node.checked = false;
    } else {
      node.indeterminate = true;
      node.checked = false;
    }
  };

  const hasChildren = !!children;
  const hasRenderProp = hasChildren && isFunction(children);

  if (hasChildren && hasRenderProp) {
    return children(select);
  }

  if (hasChildren && !hasRenderProp) {
    return React.cloneElement(children, {
      ref,
      onChange: onSelectAll
    });
  }

  return (
    <Checkbox ref={ref} type="checkbox" onChange={onSelectAll} />
  );
};

ImperativeCheckbox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

const HeaderCellSelect = React.memo(
  ({ className, children, ...passThrough }) => {
    return (
      <HeaderCell
        noResize
        className={cs('th-select', 'shrink', className)}
        {...passThrough}
      >
        <ImperativeCheckbox>{children}</ImperativeCheckbox>
      </HeaderCell>
    );
  }
);

HeaderCellSelect.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { HeaderCellSelect };
