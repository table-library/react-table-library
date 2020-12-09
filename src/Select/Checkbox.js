import * as React from 'react';
import PropTypes from 'prop-types';

import { isRenderProp } from '@common/util/isRenderProp';
import { Checkbox } from '@common/components/Checkbox';

const ImperativeCheckbox = ({
  select,
  checked,
  isIndeterminate,
  onChange,
  children
}) => {
  if (isRenderProp(children)) {
    return children(select);
  }

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

  return <Checkbox ref={ref} type="checkbox" onChange={onChange} />;
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
