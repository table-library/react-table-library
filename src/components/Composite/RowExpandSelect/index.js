import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';

import { Row } from '@table';

import { useRowExpand, EXPAND_TYPES } from '@expand';
import { useRowSelect, SELECT_TYPES } from '@select';

const RowExpandSelect = React.memo(
  ({
    id,
    item,
    // expand
    _level = 0,
    isExpanded,
    onExpandById,
    expandType,
    // select
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
      onClick: onSelectClick
    } = useRowSelect({
      id,
      isSelected,
      onSelectById,
      selectType,
      className
    });

    const {
      theme: rowExpandTheme,
      className: rowExpandClassName,
      onClick: onExpandClick,
      panel: expandPanel
    } = useRowExpand({
      _level,
      id,
      item,
      isExpanded,
      onExpandById,
      expandType,
      className,
      children,
      RecursiveComponent: RowExpandSelect
    });

    const onClick = event => {
      onExpandClick(event);
      onSelectClick(event);
    };

    return (
      <Row
        _theme={css`
          ${rowExpandTheme}
          ${rowSelectTheme}
        `}
        className={cs(rowExpandClassName, rowSelectClassName)}
        disabled={disabled}
        onClick={onClick}
        panel={expandPanel}
      >
        {children(item)}
      </Row>
    );
  }
);

RowExpandSelect.propTypes = {
  id: PropTypes.string,
  item: PropTypes.shape(PropTypes.any),
  isSelected: PropTypes.bool,
  onSelectById: PropTypes.func,
  selectType: PropTypes.oneOf(Object.values(SELECT_TYPES)),
  _level: PropTypes.number,
  isExpanded: PropTypes.bool,
  onExpandById: PropTypes.func,
  expandType: PropTypes.oneOf(Object.values(EXPAND_TYPES)),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { RowExpandSelect };
