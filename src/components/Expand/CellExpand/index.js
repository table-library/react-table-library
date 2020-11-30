import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import IconChevronSingleDown from '@icons/IconChevronSingleDown';
import IconChevronSingleRight from '@icons/IconChevronSingleRight';
import { Button, CellContainer } from '@shared';
import { ThemeContext, ExpandContext } from '@context';

import { isLeaf } from '../util';

const EXPAND_ICON_SIZE = '14px';
const EXPAND_ICON_MARGIN = '4px';

const ExpandButton = styled(Button)`
  width: auto;
`;

const ExpandContent = styled.div`
  display: flex;
  align-items: center;

  & > div {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CellExpand = React.memo(
  ({ item, width, className, indentation, children }) => {
    const theme = React.useContext(ThemeContext);
    const expand = React.useContext(ExpandContext);

    const { expandState, onExpandById } = expand;

    const handleClick = () => {
      if (isLeaf(item)) return;

      onExpandById(item.id);
    };

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
        <ExpandContent>
          <ExpandButton
            className={cs('prefix', {
              active: expanded
            })}
            margin={EXPAND_ICON_MARGIN}
            onClick={handleClick}
          >
            <span>{icon}</span>
          </ExpandButton>
          <div>{children}</div>
        </ExpandContent>
      </CellContainer>
    );
  }
);

CellExpand.propTypes = {
  item: PropTypes.shape(PropTypes.any),
  width: PropTypes.string.isRequired,
  className: PropTypes.string,
  indentation: PropTypes.number,
  children: PropTypes.node
};

export { CellExpand };
