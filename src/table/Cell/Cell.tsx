import * as React from 'react';
import cs from 'clsx';

import { CellContainer } from '@table-library/react-table-library/common/components/Cell';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';

interface CellProps {
  className?: string;
  hide?: boolean;
  pin?: boolean;
  stiff?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  children: React.ReactNode;
}

const Cell = ({
  className,
  hide,
  pin,
  stiff,
  onClick,
  children,
  ...rest
}: CellProps & Record<string, any>) => {
  const theme = React.useContext(ThemeContext);

  return (
    <CellContainer
      {...rest}
      role="gridcell"
      className={cs('td', className, {
        stiff,
        pin,
      })}
      css={`
        ${theme?.BaseCell}
        ${theme?.Cell}
      `}
      onClick={onClick}
    >
      <div>{children}</div>
    </CellContainer>
  );
};

export { Cell };
