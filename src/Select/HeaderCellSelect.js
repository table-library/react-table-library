import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { SelectContext } from '@common/context/Select';
import { HeaderCell } from '@table-library/react-table-library/lib/table/Cell';

import { ImperativeCheckbox } from './Checkbox';

const HeaderCellSelect = React.memo(
  ({ className, children, ...passThrough }) => {
    const select = React.useContext(SelectContext);

    return (
      <HeaderCell
        className={cs('th-select', 'shrink', className)}
        {...passThrough}
      >
        <ImperativeCheckbox
          select={select}
          checked={select.selectState.allSelected}
          isIndeterminate={
            !select.selectState.allSelected &&
            !select.selectState.noneSelected
          }
          onChange={select.onToggleSelectAll}
        >
          {children}
        </ImperativeCheckbox>
      </HeaderCell>
    );
  }
);

HeaderCellSelect.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { HeaderCellSelect };
