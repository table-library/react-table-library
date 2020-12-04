import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';

import { RowContainer } from '@shared';
import { ThemeContext } from '@context';

import { useRowLayout } from '../useRowLayout';
import { useDoubleClick } from './useDoubleClick';

const Row = ({
  item,
  theme: _theme,
  className,
  rowLayout,
  disabled,
  onClick,
  onDoubleClick,
  panel,
  children
}) => {
  const theme = React.useContext(ThemeContext);

  const ref = React.useRef();

  useDoubleClick(ref, onClick, onDoubleClick, item);
  useRowLayout(ref, '.td', rowLayout);

  return (
    <>
      <RowContainer
        role="row"
        className={cs('tr', className, { disabled })}
        css={css`
          ${_theme}
          ${theme?.Row}
        `}
        ref={ref}
      >
        {React.Children.map(children, child =>
          React.cloneElement(child)
        )}
      </RowContainer>

      {panel}
    </>
  );
};

Row.propTypes = {
  item: PropTypes.shape(PropTypes.any),
  theme: PropTypes.arrayOf(PropTypes.any),
  rowLayout: PropTypes.arrayOf(PropTypes.any),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  panel: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { Row };
