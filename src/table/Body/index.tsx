import * as React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import { LayoutContext } from '@table-library/react-table-library/common/context';

import { BodyProps } from '@table-library/react-table-library/types/table';

export const Body: React.FC<BodyProps> = ({ children, ...rest }: BodyProps) => {
  const theme = React.useContext(ThemeContext);

  const context = React.useContext(LayoutContext);

  if (!context) {
    throw new Error('No Layout Context.');
  }

  const { layout } = context;

  const As = layout?.isDiv ? 'div' : 'tbody';

  return (
    <As
      css={css`
        ${theme?.Body}

        display: contents;
      `}
      data-table-library_body=""
      className="tbody"
      {...rest}
    >
      {children}
    </As>
  );
};
