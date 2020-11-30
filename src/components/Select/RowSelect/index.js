import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import { RowContainer } from '@shared';
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
  ButtonSelectClick: 'ButtonSelectClick'
};

const RowSelect = ({
  selectId,
  selectType = SELECT_TYPES.RowSelectClick,
  className,
  disabled,
  children
}) => {
  const theme = React.useContext(ThemeContext);
  const select = React.useContext(SelectContext);

  const { selectState, onSelectById } = select;

  const handleClick = event => {
    // TODO
    if (event.target.tagName !== 'DIV') return;

    if (selectType === SELECT_TYPES.RowSelectClick) {
      onSelectById(selectId);
    }
  };

  return (
    <RowSelectContainer
      className={cs('tr', 'row-select', className, {
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
      {React.Children.map(children, child =>
        React.cloneElement(child, { selectId })
      )}
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
