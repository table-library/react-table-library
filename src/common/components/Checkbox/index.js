import * as React from 'react';

import styles from './styles';

const Checkbox = React.forwardRef((props, ref) => {
  return (
    <input type="checkbox" ref={ref} {...props} css={styles()} />
  );
});

export { Checkbox };
