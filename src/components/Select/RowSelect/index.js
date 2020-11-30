import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import { RowContainer } from '@shared';
import * as COLORS from '@colors';
import { ThemeContext } from '@context';

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

const RowSelect = React.memo(
  ({
    id,
    item,
    isSelected,
    onSelectById,
    selectType = SELECT_TYPES.RowSelectClick,
    className,
    disabled,
    children
  }) => {
    const theme = React.useContext(ThemeContext);

    const handleClick = event => {
      if (event.target.tagName !== 'DIV') return;

      if (selectType === SELECT_TYPES.RowSelectClick) {
        onSelectById(id);
      }
    };

    return (
      <RowSelectContainer
        className={cs('tr', 'row-select', className, {
          disabled,
          'selectable-row':
            selectType === SELECT_TYPES.RowSelectClick,
          'selected-row': isSelected
        })}
        css={theme?.RowSelect}
        onClick={handleClick}
      >
        {children(item)}
      </RowSelectContainer>
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
