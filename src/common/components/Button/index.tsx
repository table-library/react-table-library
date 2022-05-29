import * as React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import styles from './styles';

export const Button = React.forwardRef(
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLButtonElement>) => {
    return <button type="button" ref={ref} {...props} css={styles} />;
  },
);
