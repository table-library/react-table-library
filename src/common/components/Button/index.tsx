import * as React from 'react';

import styles from './styles';

interface ButtonProps {
  margin: string;
}

const Button = React.forwardRef(
  (
    { margin, ...props }: ButtonProps & Record<string, any>,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    return <button type="button" ref={ref} {...props} css={styles({ margin })} />;
  },
);

export { Button };
