import * as React from 'react';

import { LayoutContext, ResizeContext } from '@context';

export const useRowLayout = ref => {
  const { layout } = React.useContext(LayoutContext);
  const { resizedLayout } = React.useContext(ResizeContext);

  React.useLayoutEffect(() => {
    const columns = resizedLayout.current
      ? resizedLayout.current
      : layout;

    ref.current.style.display = 'grid';
    ref.current.style['grid-template-columns'] = columns.join(' ');
  }, [layout, ref, resizedLayout]);
};
