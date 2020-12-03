import * as React from 'react';

import { LayoutContext, ResizeContext } from '@context';

export const useRowLayout = (ref, selector, children) => {
  // const { layout } = React.useContext(LayoutContext);
  const { resizedWidths } = React.useContext(ResizeContext);

  React.useLayoutEffect(() => {
    console.log(resizedWidths);

    const cells = ref.current.querySelectorAll(selector);

    cells.forEach((cell, index) => {
      if (resizedWidths?.current?.[index]) {
        cell.style.width = resizedWidths.current[index];
      } else {
        cell.style.width = `${100 / cells.length}%`;
      }
    });

    // const columns = resizedWidths.current
    //   ? resizedWidths.current
    //   : layout;
    // ref.current.style.display = 'grid';
    // ref.current.style['grid-template-columns'] = columns.join(' ');
    // }, [layout, ref, resizedWidths]);
  }, [ref, resizedWidths, selector]);
};
