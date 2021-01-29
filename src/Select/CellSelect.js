import * as React from 'react';
import PropTypes from 'prop-types';

import { Cell } from '@table-library/react-table-library/lib/table/Cell';
import { SelectContext } from '@common/context/Select';

import { ImperativeCheckbox } from './Checkbox';

const CellSelect = React.memo(
  ({ item, children, ...passThrough }) => {
    const select = React.useContext(SelectContext);

    const isSelected = select.state.ids.includes(item.id);
    const handleChange = () =>
      select.fns.onToggleByIdRecursively(item.id);

    return (
      <Cell shrink {...passThrough}>
        <ImperativeCheckbox
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
    PropTypes.func
  ])
};

export { CellSelect };
