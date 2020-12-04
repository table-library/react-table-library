import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import { Cell } from '@table';
import { SelectContext } from '@context';

const Checkbox = styled.input`
  cursor: pointer;
`;

const CellSelect = React.memo(
  ({ item, className, children, ...passThrough }) => {
    const { selectState, onSelectById } = React.useContext(
      SelectContext
    );

    const isSelected = selectState.ids.includes(item.id);

    const handleChange = () => {
      onSelectById(item.id);
    };

    return (
      <Cell
        className={cs('td-select', 'shrink', className)}
        {...passThrough}
      >
        {children ? (
          React.cloneElement(children, {
            checked: isSelected,
            onChange: handleChange
          })
        ) : (
          <Checkbox
            type="checkbox"
            checked={isSelected}
            onChange={handleChange}
          />
        )}
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
