import * as React from 'react';
import PropTypes from 'prop-types';

import { Checkbox as CheckboxBase } from '@table-library/react-table-library/common/components/Checkbox';

const Checkbox = ({ checked, isIndeterminate, onChange }) => {
  const ref = (node) => {
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

  return (
    <CheckboxBase ref={ref} type="checkbox" onChange={onChange} />
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  isIndeterminate: PropTypes.bool,
  onChange: PropTypes.func,
};

export { Checkbox };
