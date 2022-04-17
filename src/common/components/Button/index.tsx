import * as React from 'react';

import { Style } from '@table-library/react-table-library/common/components/Style';

import { button } from './styles';

export const Button = React.forwardRef(
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLButtonElement>) => {
    return (
      <>
        <Style __html={button(props)} />
        <button type="button" ref={ref} {...props} data-table-library_button="" />
      </>
    );
  },
);
