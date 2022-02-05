import * as React from 'react';

import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';

const headerRow = `
  position: sticky;
  top: 0;
  z-index: 4;
`;

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const theme = React.useContext(ThemeContext);

  return (
    <div
      role="rowgroup"
      className="thead"
      css={`
        ${headerRow}
        ${theme?.Header}
      `}
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
