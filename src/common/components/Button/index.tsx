import * as React from 'react';

import styles from './styles';

export const Button = React.forwardRef(
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLButtonElement>) => {
    return <button type="button" ref={ref} {...props} css={styles} />;
  },
);
