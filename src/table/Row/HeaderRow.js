import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { HeaderRowContainer } from '@table-library/react-table-library/common/components/Row';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';

import { useProduceRowLayout } from '@table-library/react-table-library/resize/useProduceRowLayout';
import { useConsumeRowLayout } from '@table-library/react-table-library/resize/useConsumeRowLayout';
import { useListenerRowLayout } from '@table-library/react-table-library/resize/useListenerRowLayout';

const HeaderRow = ({ className, disabled, children }) => {
  const theme = React.useContext(ThemeContext);

  const ref = React.useRef();
  useProduceRowLayout(ref, '.th');
  useConsumeRowLayout(ref, '.th');
  useListenerRowLayout(ref, '.th');

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
        .map((child) =>
          React.cloneElement(child, {
            index: Number(
              child.key.replace('.', '').replace('$', '')
            ),
          })
        )}
    </HeaderRowContainer>
  );
};

HeaderRow.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { HeaderRow };
