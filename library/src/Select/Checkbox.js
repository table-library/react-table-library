import * as React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '@common/components/Checkbox';

const ImperativeCheckbox = ({
  checked,
  isIndeterminate,
  onChange
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

  return <Checkbox ref={ref} type="checkbox" onChange={onChange} />;
};

ImperativeCheckbox.propTypes = {
  checked: PropTypes.bool,
  isIndeterminate: PropTypes.bool,
  onChange: PropTypes.func
};

export { ImperativeCheckbox };
