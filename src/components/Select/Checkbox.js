import * as React from 'react';
import PropTypes from 'prop-types';

import { isFunction } from '@util/isFunction';
import { Checkbox } from '@shared/Checkbox';

const ImperativeCheckbox = ({
  select,
  checked,
  isIndeterminate,
  onChange,
  children
}) => {
  const ref = node => {
    if (!node) return;

    if (checked) {
      node.indeterminate = false;
      node.checked = true;
    } else if (isIndeterminate) {
      node.indeterminate = true;
      node.checked = false;
    } else {
      node.indeterminate = false;
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
      checked,
      onChange
    });
  }

  return (
    <Checkbox
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};

ImperativeCheckbox.propTypes = {
  select: PropTypes.shape(PropTypes.any),
  checked: PropTypes.bool,
  isIndeterminate: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { ImperativeCheckbox };
