import * as React from 'react';

import isEqual from 'lodash.isequal';

import { Row } from './Row';

const applyMemo = (prevProps, nextProps) => {
  // eslint-disable-next-line react/prop-types
  const {
    children: childrenNext,
    plugins: pluginsNext,
    ...restNext
  } = nextProps;
  // eslint-disable-next-line react/prop-types
  const {
    children: childrenPrev,
    plugins: pluginsPrev,
    ...restPrev
  } = prevProps;

  const preventRenderFromChildren =
    JSON.stringify(childrenNext) === JSON.stringify(childrenPrev);

  const preventRenderFromPlugins =
    JSON.stringify(pluginsNext) === JSON.stringify(pluginsPrev);

  const preventRenderFromRest = Object.keys(restNext).reduce(
    (acc, key) => {
      if (!acc) return acc;

      if (!isEqual(restNext[key], restPrev[key])) {
        return false;
      }

      return acc;
    },
    true
  );

  return (
    preventRenderFromRest &&
    preventRenderFromPlugins &&
    preventRenderFromChildren
  );
};

const MemoizedRow = React.memo(Row, applyMemo);

export { MemoizedRow };
