import * as React from 'react';
import PropTypes from 'prop-types';

import { SelectContext } from '@table-library/react-table-library/common/context/Select';
import { HeaderCell } from '@table-library/react-table-library/table/Cell';

import { Checkbox } from './Checkbox';

const HeaderCellSelect = React.memo(
  ({ children, ...passThrough }) => {
    const select = React.useContext(SelectContext);

    const isSelected = select.state.all;
    const isIndeterminate = !select.state.all && !select.state.none;
    const handleChange = () => select.fns.onToggleAll();

    return (
      <HeaderCell shrink {...passThrough}>
        <Checkbox
          checked={isSelected}
          isIndeterminate={isIndeterminate}
          onChange={handleChange}
        />
      </HeaderCell>
    );
  }
);

HeaderCellSelect.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { HeaderCellSelect };
