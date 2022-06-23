import * as React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';

import { HeaderProps } from '@table-library/react-table-library/types/table';

const headerRow = `
  display: contents;
`;

export const Header: React.FC<HeaderProps> = ({
  _className = 'thead',
  children,
  ...rest
}: HeaderProps) => {
  const theme = React.useContext(ThemeContext);

  return (
    <thead
      role="rowgroup"
      className={_className}
      css={css`
        ${headerRow}
        ${theme?.Header}
      `}
      {...rest}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child);
        }
      })}
    </thead>
  );
};
