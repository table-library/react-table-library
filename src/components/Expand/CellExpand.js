import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import IconChevronSingleDown from '@icons/IconChevronSingleDown';
import IconChevronSingleUp from '@icons/IconChevronSingleUp';
import { getIcon } from '@util/getIcon';
import { Button } from '@shared/Button';
import { Cell } from '@table/Cell';
import { ExpandContext } from '@context/Expand';

const EXPAND_ICON_SIZE = '14px';

const getExpandIcon = (
  item,
  expandState,
  expandIconSize,
  ExpandIconUp,
  ExpandIconDown
) => {
  const size = {
    height: `${expandIconSize}`,
    width: `${expandIconSize}`
  };

  const isExpanded = expandState.ids.includes(item.id);

  if (isExpanded) {
    return ExpandIconUp
      ? React.cloneElement(ExpandIconUp, { ...size })
      : null;
  } else {
    return ExpandIconDown
      ? React.cloneElement(ExpandIconDown, { ...size })
      : null;
  }
};

const CellExpand = React.memo(
  ({
    item,
    expandIcon = {},
    className,
    children,
    ...passThrough
  }) => {
    const { expandState, onExpandById } = React.useContext(
      ExpandContext
    );

    const expandIconSize = expandIcon.size || EXPAND_ICON_SIZE;
    const expandIconRight = getIcon(
      expandIcon.iconRight,
      <IconChevronSingleUp />
    );
    const expandIconDown = getIcon(
      expandIcon.iconDown,
      <IconChevronSingleDown />
    );

    const handleClick = () => {
      onExpandById(item.id);
    };

    const icon = getExpandIcon(
      item,
      expandState,
      expandIconSize,
      expandIconRight,
      expandIconDown
    );

    // TODO custom button

    return (
      <Cell
        className={cs('cell-expand', 'shrink', className)}
        {...passThrough}
      >
        {children ? null : (
          <Button className="narrow" onClick={handleClick}>
            <span>{icon}</span>
          </Button>
        )}
      </Cell>
    );
  }
);

CellExpand.propTypes = {
  item: PropTypes.shape(PropTypes.any),
  expandIcon: PropTypes.shape({
    size: PropTypes.string,
    iconDefault: PropTypes.node,
    iconRight: PropTypes.node,
    iconDown: PropTypes.node
  }),
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { CellExpand };
