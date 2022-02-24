import * as React from 'react';

import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import { BodyProps } from '@table-library/react-table-library/types/table';

const Body = ({ children, ...rest }: BodyProps) => {
  const theme = React.useContext(ThemeContext);

  return (
    <div
      className="tbody"
      css={`
        ${theme?.Body}
      `}
      {...rest}
    >
      {children}
    </div>
  );
};

export { Body };
