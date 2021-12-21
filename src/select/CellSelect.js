import * as React from 'react';
import PropTypes from 'prop-types';

import { Cell } from '@table-library/react-table-library/table/Cell';
import { SelectContext } from '@table-library/react-table-library/common/context/Select';

import { Checkbox } from './Checkbox';
import { SELECT_TYPES } from './config';

const CellSelect = React.memo(
  ({ item, children, ...passThrough }) => {
    const select = React.useContext(SelectContext);

    const isSelected =
      select._options.buttonSelect === SELECT_TYPES.SingleSelect
        ? select.state.id === item.id ||
          select.state.ids.includes(item.id)
        : select.state.ids.includes(item.id);

    const handleChange = () => {
      const isSingleSelect =
        select._options.buttonSelect === SELECT_TYPES.SingleSelect;

      if (isSingleSelect) {
        select.fns.onToggleByIdExclusively(item.id);
      } else {
        select.fns.onToggleByIdRecursively(item.id, {
          isCarryForward: select._options.isCarryForward,
        });
      }
    };

    return (
      <Cell stiff {...passThrough}>
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
