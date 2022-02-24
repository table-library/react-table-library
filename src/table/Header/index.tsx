import * as React from 'react';

import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';

import { HeaderProps } from '@table-library/react-table-library/types/table';

const headerRow = `
  position: sticky;
  top: 0;
  z-index: 4;
`;

const Header = ({ children, ...rest }: HeaderProps) => {
  const theme = React.useContext(ThemeContext);

  return (
    <div
      role="rowgroup"
      className="thead"
      css={`
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
    </div>
  );
};

export { Header };
