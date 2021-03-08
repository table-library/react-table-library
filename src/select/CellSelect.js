import * as React from 'react';
import PropTypes from 'prop-types';

import { Cell } from '@table-library/react-table-library/table/Cell';
import { SelectContext } from '@table-library/react-table-library/common/context/Select';

import { Checkbox } from './Checkbox';

const CellSelect = React.memo(
  ({ item, children, ...passThrough }) => {
    const select = React.useContext(SelectContext);

    const isSelected =
      select.state.ids.includes(item.id) ||
      select.state.id === item.id;
    const handleChange = () =>
      select._options.isSingle
        ? select.fns.onToggleByIdExclusively(item.id)
        : select.fns.onToggleByIdRecursively(item.id);

    return (
      <Cell shrink {...passThrough}>
        <Checkbox
          select={select}
          checked={isSelected}
          onChange={handleChange}
        />
      </Cell>
    );
  }
);

CellSelect.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { CellSelect };
