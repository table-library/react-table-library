import * as React from 'react';
import { css } from 'styled-components';
import cs from 'classnames';
import PropTypes from 'prop-types';

import { Row } from '@table/Row';
import { isRowClick } from '@util/isRowClick';
import * as COLORS from '@colors';

import { SELECT_TYPES } from './config';

const useRowSelect = ({
  id,
  isSelected,
  onSelectById,
  selectType = SELECT_TYPES.RowSelectClick,
  className
}) => {
  const rowSelectTheme = css`
    &.selected-row {
      color: ${COLORS.FONT_PRIMARY};
      font-weight: bold;

      background-color: ${COLORS.ROW_SELECTED};
    }

    &.selectable-row {
      cursor: pointer;
    }
  `;

  const rowSelectClassName = cs('row-select', className, {
    'selectable-row': selectType === SELECT_TYPES.RowSelectClick,
    'selected-row': isSelected
  });

  const handleClick = event => {
    if (!isRowClick(event)) return;

    if (selectType === SELECT_TYPES.RowSelectClick) {
      onSelectById(id);
    }
  };

  return {
    theme: rowSelectTheme,
    className: rowSelectClassName,
    handleClick
  };
};

const RowSelect = React.memo(
  ({
    id,
    item,
    isSelected,
    onSelectById,
    selectType,
    className,
    onClick,
    children,
    ...passThrough
  }) => {
    const {
      theme: rowSelectTheme,
      className: rowSelectClassName,
      handleClick: handleSelectClick
    } = useRowSelect({
      id,
      isSelected,
      onSelectById,
      selectType,
      className
    });

    const handleClick = (tableItem, event) => {
      handleSelectClick(event);

      if (onClick && isRowClick(event)) {
        onClick(tableItem, event);
      }
    };

    return (
      <Row
        item={item}
        theme={rowSelectTheme}
        className={rowSelectClassName}
        onClick={handleClick}
        {...passThrough}
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
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { RowSelect, useRowSelect, SELECT_TYPES };
