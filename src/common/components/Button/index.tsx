import * as React from 'react';

import BaseButton from './styles';

type ButtonProps = {
  margin: string;
} & Record<string, any>;

export const Button: React.FC<ButtonProps> = React.forwardRef(
  ({ margin, ...props }: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const Component = BaseButton({ margin });
    return <Component type="button" ref={ref} {...props} />;
  },
);
