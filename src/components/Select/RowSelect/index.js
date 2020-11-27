import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import { RowBase, RowContainer } from '@shared';
import * as COLORS from '@colors';
import { ThemeContext, SelectContext } from '@context';

const RowSelectContainer = styled(RowContainer)`
  &.selected-row {
    color: ${COLORS.FONT_PRIMARY};
    font-weight: bold;
  }

  &.selectable-row {
    cursor: pointer;
  }
`;

const SELECT_TYPES = {
  RowSelectClick: 'RowSelectClick',
  CellSelectClick: 'CellSelectClick'
};

const RowSelect = ({
  selectId,
  selectType = SELECT_TYPES.RowSelectClick,
  className,
  disabled,
  children
}) => {
  const theme = React.useContext(ThemeContext);

  const { selectState, onSelectById } = React.useContext(
    SelectContext
  );

  const handleClick = event => {
    // TODO
    if (event.target.tagName !== 'DIV') return;

    if (selectType === SELECT_TYPES.RowSelectClick) {
      onSelectById(selectId);
    }
  };

  return (
    <RowSelectContainer
      className={cs('tr', className, {
        disabled,
        'selectable-row':
          selectId != null &&
          selectType === SELECT_TYPES.RowSelectClick,
        'selected-row':
          selectId != null && selectState.ids.includes(selectId)
      })}
      css={theme?.RowSelect}
      onClick={handleClick}
    >
      <RowBase>{children}</RowBase>
    </RowSelectContainer>
  );
};

RowSelect.SELECT_TYPES = SELECT_TYPES;

RowSelect.propTypes = {
  selectId: PropTypes.string.isRequired,
  selectType: PropTypes.oneOf(Object.values(SELECT_TYPES)),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export { RowSelect };
