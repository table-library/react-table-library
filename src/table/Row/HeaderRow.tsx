import * as React from 'react';
import cs from 'classnames';

import { HeaderRowContainer } from '@table-library/react-table-library/common/components/Row';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import { useProduceRowLayout } from '@table-library/react-table-library/resize/useProduceRowLayout';
import { useConsumeRowLayout } from '@table-library/react-table-library/resize/useConsumeRowLayout';
import { useLayoutHide } from '@table-library/react-table-library/resize/useLayoutHide';

interface HeaderRowProps {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const HeaderRow = ({ className, disabled, children }: HeaderRowProps) => {
  const theme = React.useContext(ThemeContext);

  const ref = React.useRef<HTMLDivElement>(null);
  useProduceRowLayout(ref, '.th');
  useConsumeRowLayout(ref, '.th');
  useLayoutHide();
  useConsumeRowLayout(ref, '.th');

  return (
    <HeaderRowContainer
      role="rowheader"
      className={cs('tr', 'tr-header', className, { disabled })}
      css={`
        ${theme?.BaseRow}
        ${theme?.HeaderRow}
      `}
      ref={ref}
    >
      {React.Children.toArray(children)
        .filter(Boolean)
        .map((child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              index,
            });
          }
        })}
    </HeaderRowContainer>
  );
};

export { HeaderRow };
