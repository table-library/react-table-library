import * as React from 'react';
import PropTypes from 'prop-types';

import { Row } from '@table';

import { SELECT_TYPES } from './config';
import { useRowSelect } from './useRowSelect';

const RowSelect = React.memo(
  ({
    id,
    item,
    isSelected,
    onSelectById,
    selectType,
    className,
    disabled,
    children
  }) => {
    const {
      theme: rowSelectTheme,
      className: rowSelectClassName,
      onClick
    } = useRowSelect({
      id,
      isSelected,
      onSelectById,
      selectType
    });

    return (
      <Row
        className={className}
        disabled={disabled}
        _theme={rowSelectTheme}
        _className={rowSelectClassName}
        onClick={onClick}
      >
        {children(item)}
      </Row>
    );
  }
);

RowSelect.SELECT_TYPES = SELECT_TYPES;

RowSelect.propTypes = {
  id: PropTypes.string,
  item: PropTypes.shape(PropTypes.any),
  isSelected: PropTypes.bool,
  onSelectById: PropTypes.func,
  selectType: PropTypes.oneOf(Object.values(SELECT_TYPES)),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { RowSelect };
