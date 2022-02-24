import * as React from 'react';
import cs from 'clsx';

import { HeaderRowContainer } from '@table-library/react-table-library/common/components/Row';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import { useProduceRowLayout } from '@table-library/react-table-library/resize/useProduceRowLayout';
import { useConsumeRowLayout } from '@table-library/react-table-library/resize/useConsumeRowLayout';
import { useLayoutHide } from '@table-library/react-table-library/resize/useLayoutHide';

import { HeaderRowProps } from '@table-library/react-table-library/types/table';

const isReactFragment = (variableToInspect: any) => {
  if (variableToInspect.type) {
    return variableToInspect.type === React.Fragment;
  }
  return variableToInspect === React.Fragment;
};

const HeaderRow = ({ className, children, ...rest }: HeaderRowProps) => {
  const theme = React.useContext(ThemeContext);

  const ref = React.useRef<HTMLDivElement>(null);
  useProduceRowLayout(ref, '.th');
  useConsumeRowLayout(ref, '.th');
  useLayoutHide();
  useConsumeRowLayout(ref, '.th');

  return (
    <HeaderRowContainer
      role="rowheader"
      className={cs('tr', 'tr-header', className)}
      css={`
        ${theme?.BaseRow}
        ${theme?.HeaderRow}
      `}
      ref={ref}
      {...rest}
    >
      {React.Children.toArray(children)
        .filter(Boolean)
        .map((child, index) => {
          if (React.isValidElement(child)) {
            let extraProps = {};

            // edge case: CompactTable renders checkbox (select feature) + cell in one fragment
            // this would break the resize feature
            // hence we need to pass the index from the outside then (see CompactTable)
            if (!isReactFragment(child)) {
              extraProps = {
                ...extraProps,
                index,
              };
            }

            return React.cloneElement(child, extraProps);
          }
        })}
    </HeaderRowContainer>
  );
};

export { HeaderRow };
