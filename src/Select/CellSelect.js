import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { Cell } from '@table/Cell';
import { SelectContext } from '@common/context/Select';

import { ImperativeCheckbox } from './Checkbox';

const CellSelect = React.memo(
  ({ item, className, children, ...passThrough }) => {
    const select = React.useContext(SelectContext);
    const isSelected = select.selectState.ids.includes(item.id);
    const handleChange = () => select.onSelectById(item.id);

    return (
      <Cell
        className={cs('td-select', 'shrink', className)}
        {...passThrough}
      >
        <ImperativeCheckbox
          select={select}
          checked={isSelected}
          onChange={handleChange}
        >
          {children}
        </ImperativeCheckbox>
      </Cell>
    );
  }
);

CellSelect.propTypes = {
  item: PropTypes.shape(PropTypes.any),
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { CellSelect };
