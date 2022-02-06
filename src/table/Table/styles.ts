/* eslint-disable @typescript-eslint/indent */

import { Nullish } from '@table-library/react-table-library/types/common';
import { Layout } from '@table-library/react-table-library/types/layout';

type Configuration = {
  isShiftDown: boolean;
};

export default (layout: Layout | Nullish, configuration: Configuration) => `
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  overflow-x: ${layout?.horizontalScroll ? 'auto' : 'hidden'};
  overflow-y: auto;
  position: relative;

 ${
   configuration.isShiftDown
     ? `
        user-select: none; /* standard syntax */
        -webkit-user-select: none; /* webkit (safari, chrome) browsers */
        -moz-user-select: none; /* mozilla browsers */
        -khtml-user-select: none; /* webkit (konqueror) browsers */
        -ms-user-select: none; /* IE10+ */
      `
     : ''
 }
`;

/* eslint-enable @typescript-eslint/indent */
