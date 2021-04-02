import * as React from 'react';

import styles from './styles.module.css';

const Checkbox = React.forwardRef((props, ref) => {
  return (
    <input
      type="checkbox"
      {...props}
      ref={ref}
      className={styles.checkbox}
    />
  );
});

export { Checkbox };
