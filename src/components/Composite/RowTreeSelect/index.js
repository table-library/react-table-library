import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';

import { Row } from '@table';

import { useRowTree, TREE_TYPES } from '@tree';
import { useRowSelect, SELECT_TYPES } from '@select';

const RowTreeSelect = React.memo(
  ({
    id,
    item,
    // tree
    treeDepthLevel = 0,
    treeColumnLevel = 1,
    isTreeExpanded,
    onTreeExpandById,
    treeType,
    // select
    isSelected,
    onSelectById,
    selectType,
    className,
    disabled,
    onDoubleClick,
    children
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

    const {
      theme: rowTreeTheme,
      className: rowTreeClassName,
      handleClick: handleTreeClick,
      panel: treePanel
    } = useRowTree({
      id,
      item,
      treeColumnLevel,
      treeDepthLevel,
      isTreeExpanded,
      onTreeExpandById,
      treeType,
      composites: {
        selectType
      },
      className,
      children,
      onDoubleClick,
      RecursiveComponent: RowTreeSelect
    });

    const handleClick = event => {
      handleTreeClick(event);
      handleSelectClick(event);
    };

    return (
      <Row
        item={item}
        theme={css`
          ${rowTreeTheme}
          ${rowSelectTheme}
        `}
        className={cs(rowTreeClassName, rowSelectClassName)}
        disabled={disabled}
        onClick={handleClick}
        onDoubleClick={onDoubleClick}
        panel={treePanel}
      >
        {children(item)}
      </Row>
    );
  }
);

RowTreeSelect.SELECT_TYPES = SELECT_TYPES;
RowTreeSelect.TREE_TYPES = TREE_TYPES;

RowTreeSelect.propTypes = {
  id: PropTypes.string,
  item: PropTypes.shape(PropTypes.any),
  isSelected: PropTypes.bool,
  onSelectById: PropTypes.func,
  selectType: PropTypes.oneOf(Object.values(SELECT_TYPES)),
  treeDepthLevel: PropTypes.number,
  treeColumnLevel: PropTypes.number,
  isTreeExpanded: PropTypes.bool,
  onTreeExpandById: PropTypes.func,
  treeType: PropTypes.oneOf(Object.values(TREE_TYPES)),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onDoubleClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { RowTreeSelect };
