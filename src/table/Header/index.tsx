import * as React from 'react';
import cs from 'clsx';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { ThemeContext } from '@overmap-ai/react-table-library/common/context/Theme';
import { LayoutContext } from '@overmap-ai/react-table-library/common/context';

import { HeaderProps } from '@overmap-ai/react-table-library/types/table';

const headerRow = `
  display: contents;
`;

export const Header: React.FC<HeaderProps> = ({ isFooter, children, ...rest }: HeaderProps) => {
  const theme = React.useContext(ThemeContext);

  const context = React.useContext(LayoutContext);

  if (!context) {
    throw new Error('No Layout Context.');
  }

  const { layout } = context;

  const As = layout?.isDiv ? 'div' : isFooter ? 'tfoot' : 'thead';

  return (
    <As
      role="rowgroup"
      className={cs({ tfoot: isFooter, thead: !isFooter })}
      css={css`
        ${headerRow}
        ${isFooter ? theme?.Footer : theme?.Header}
      `}
      {...rest}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child);
        }
      })}
    </As>
  );
};
