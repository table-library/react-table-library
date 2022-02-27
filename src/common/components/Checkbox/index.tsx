import * as React from 'react';

import BaseCheckbox from './styles';

const Checkbox = React.forwardRef(
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLInputElement>) => {
    return <BaseCheckbox type="checkbox" ref={ref} {...props} />;
  },
);

export { Checkbox };
