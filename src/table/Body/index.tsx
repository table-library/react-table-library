import * as React from 'react';

import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';

interface BodyProps {
  children: React.ReactNode;
}

const Body = ({ children }: BodyProps) => {
  const theme = React.useContext(ThemeContext);

  return (
    <div
      className="tbody"
      css={`
        ${theme?.Body}
      `}
    >
      {children}
    </div>
  );
};

export { Body };
