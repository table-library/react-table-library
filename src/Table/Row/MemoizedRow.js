import * as React from 'react';

import isEqual from 'lodash.isequal';

import { Row } from './Row';

const applyMemo = (prevProps, nextProps) => {
  // eslint-disable-next-line react/prop-types
  const {
    children: childrenNext,
    rowPropsByFeature: rowPropsByFeatureNext,
    ...restNext
  } = nextProps;
  // eslint-disable-next-line react/prop-types
  const {
    children: childrenPrev,
    rowPropsByFeature: rowPropsByFeaturePrev,
    ...restPrev
  } = prevProps;

  const preventRenderFromChildren =
    JSON.stringify(childrenNext) === JSON.stringify(childrenPrev);

  const preventRenderFromRowPropsByFeature =
    JSON.stringify(rowPropsByFeatureNext) ===
    JSON.stringify(rowPropsByFeaturePrev);

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
    preventRenderFromRowPropsByFeature &&
    preventRenderFromChildren
  );
};

const MemoizedRow = React.memo(Row, applyMemo);

export { MemoizedRow };
