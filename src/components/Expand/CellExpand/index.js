import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import IconChevronSingleDown from '@icons/IconChevronSingleDown';
import IconChevronSingleRight from '@icons/IconChevronSingleRight';
import { CellContainer } from '@shared';
import { ThemeContext, ExpandContext } from '@context';

import { isLeaf, hasLeaves, EXPAND_TYPES } from '../util';

const EXPAND_ICON_SIZE = '14px';
const EXPAND_ICON_MARGIN = '4px';

const Icon = styled.span`
  margin-right: ${EXPAND_ICON_MARGIN};
`;

const CellExpand = ({
  item,
  width,
  className,
  indentation,
  children
}) => {
  const theme = React.useContext(ThemeContext);
  const expand = React.useContext(ExpandContext);

  const { expandState, onExpandById } = expand;

  // const handleClick = event => {
  //   // TODO
  //   if (event.target.tagName !== 'DIV') return;

  //   if (expandType === EXPAND_TYPES.RowExpandClick) {
  //     onExpandById(item.id);
  //   }
  // };

  const expanded = expandState.ids.includes(item.id);

  let icon = null;

  if (isLeaf(item)) {
    icon = null;
  } else if (!isLeaf(item) && expanded) {
    icon = (
      <IconChevronSingleDown
        height={EXPAND_ICON_SIZE}
        width={EXPAND_ICON_SIZE}
      />
    );
  } else if (!isLeaf(item) && !expanded) {
    icon = (
      <IconChevronSingleRight
        height={EXPAND_ICON_SIZE}
        width={EXPAND_ICON_SIZE}
      />
    );
  }

  return (
    <CellContainer
      className={cs('td', 'cell-expand', className)}
      css={theme?.Cell}
      width={width}
      indentation={indentation}
    >
      <div>
        <Icon>{icon}</Icon>
        {children}
      </div>
    </CellContainer>
  );
};

CellExpand.propTypes = {
  item: PropTypes.shape(PropTypes.any),
  width: PropTypes.string.isRequired,
  className: PropTypes.string,
  indentation: PropTypes.number,
  children: PropTypes.node
};

export { CellExpand };
