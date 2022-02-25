import * as React from 'react';

import styles from './styles';

type ButtonProps = {
  margin: string;
} & Record<string, any>;

export const Button: React.FC<ButtonProps> = React.forwardRef(
  ({ margin, ...props }: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    return <button type="button" ref={ref} {...props} css={styles({ margin })} />;
  },
);
