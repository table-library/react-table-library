import * as React from 'react';

import { Checkbox as CheckboxBase } from '@overmap-ai/react-table-library/common/components/Checkbox';

type CheckboxProps = {
  checked: boolean;
  isIndeterminate?: boolean;
  onChange: (event: React.SyntheticEvent) => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  isIndeterminate,
  onChange,
}: CheckboxProps) => {
  const ref = (node: HTMLInputElement) => {
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

  return <CheckboxBase ref={ref} type="checkbox" onChange={onChange} />;
};
