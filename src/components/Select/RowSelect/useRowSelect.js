import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';

import * as COLORS from '@colors';

import { SELECT_TYPES } from './config';

const RowSelectTheme = css`
  &.selected-row {
    color: ${COLORS.FONT_PRIMARY};
    font-weight: bold;
  }

  &.selectable-row {
    cursor: pointer;
  }
`;

const useRowSelect = ({
  id,
  isSelected,
  onSelectById,
  selectType = SELECT_TYPES.RowSelectClick
}) => {
  const handleClick = event => {
    if (event.target.tagName !== 'DIV') return;

    if (selectType === SELECT_TYPES.RowSelectClick) {
      onSelectById(id);
    }
  };

  return {
    theme: RowSelectTheme,
    className: cs('row-select', {
      'selectable-row': selectType === SELECT_TYPES.RowSelectClick,
      'selected-row': isSelected
    }),
    onClick: handleClick
  };
};

export { useRowSelect };
