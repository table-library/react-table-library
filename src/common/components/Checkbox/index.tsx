import * as React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import styles from './styles';

const Checkbox = React.forwardRef(
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLInputElement>) => {
    return <input type="checkbox" ref={ref} {...props} css={styles} />;
  },
);

export { Checkbox };
