import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { SelectContext } from '@common/context/Select';
import { HeaderCell } from '@table-library/react-table-library/lib/table/Cell';

import { ImperativeCheckbox } from './Checkbox';

const HeaderCellSelect = React.memo(
  ({ custom, className, children, ...passThrough }) => {
    const select = React.useContext(SelectContext);

    return (
      <HeaderCell
        className={cs('th-select', 'shrink', className)}
        {...passThrough}
      >
        {custom ? (
          children
        ) : (
          <ImperativeCheckbox
            checked={select.state.all}
            isIndeterminate={!select.state.all && !select.state.none}
            onChange={select.fns.onToggleAll}
          />
        )}
      </HeaderCell>
    );
  }
);

HeaderCellSelect.propTypes = {
  custom: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { HeaderCellSelect };
