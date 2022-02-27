import * as React from 'react';
import { styled } from '@stitches/react';

import * as COLORS from '@table-library/react-table-library/common/colors';

const GUTTER = 6;

const BASE_STYLE = styled('div', {
  display: 'flex',
  alignItems: 'center',

  paddingTop: '4px',
  paddingBottom: '4px',

  '&:not(.stiff) > div': {
    width: '100%',

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  '&:first-child > div': {
    paddingLeft: `${GUTTER}px`,
  },

  '& > div': {
    paddingRight: `${GUTTER}px`,
    paddingLeft: '20px',
  },

  '&:last-child > div': {
    paddingRight: `${GUTTER}px`,
  },

  borderRight: `1px solid ${COLORS.BORDER}`,

  '&:last-child': {
    borderRight: '0px solid transparent',
  },

  '&.stiff > div': {
    paddingRight: `${GUTTER}px`,
    paddingLeft: `${GUTTER}px`,
  },

  '&.hide:': {
    display: 'none',
  },

  '&.pin': {
    position: 'sticky',
    left: 0,
    zIndex: 3,
  },

  /* #1 */
  /* otherwise tree + resize would have overflow icons */
  backgroundColor: 'inherit',
});

const BaseCellContainer = styled(BASE_STYLE, {});

const CellContainer = React.forwardRef(
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLDivElement>) => {
    return <BaseCellContainer {...props} ref={ref} />;
  },
);

const BaseHeaderCellContainer = styled(BASE_STYLE, {
  position: 'relative',

  borderBottom: `1px solid ${COLORS.BORDER}`,

  'svg, path': {
    fill: 'currentColor',
  },
});

const HeaderCellContainer = React.forwardRef(
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLDivElement>) => {
    return <BaseHeaderCellContainer {...props} ref={ref} />;
  },
);

export { CellContainer, HeaderCellContainer };
