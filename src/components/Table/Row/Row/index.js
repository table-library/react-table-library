import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';
import useDoubleClick from 'use-double-click';

import { RowContainer } from '@shared';
import { ThemeContext } from '@context';

const NOOP = () => {};

const Row = ({
  item,
  theme: _theme,
  className,
  disabled,
  onClick,
  onDoubleClick,
  panel,
  children
}) => {
  const theme = React.useContext(ThemeContext);

  const ref = React.useRef();
  useDoubleClick({
    onSingleClick: onClick || NOOP,
    onDoubleClick: onDoubleClick
      ? event => onDoubleClick(event, item)
      : NOOP,
    latency: onDoubleClick ? 250 : 0,
    ref
  });

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
        {children}
      </RowContainer>

      {panel}
    </>
  );
};

Row.propTypes = {
  item: PropTypes.shape(PropTypes.any),
  theme: PropTypes.arrayOf(PropTypes.any),
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
