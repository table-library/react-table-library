import * as React from 'react';
import isEqual from 'lodash.isequal';

import { usePrevious } from '@common/util/usePrevious';

const dependenciesToState = dependencies =>
  Object.keys(dependencies).reduce(
    (acc, key) => ({
      ...acc,
      [dependencies[key].stateKey]: dependencies[key].stateValue
    }),
    {}
  );

export const useTableState = (callback, dependencies = {}) => {
  const tableFeatureRef = React.useRef();
  const thirdPartyStateRef = React.useRef();

  // #1 memoize tableState
  const firstEnhancedCallback = React.useCallback(
    (type, tableState, thirdPartyState = {}) => {
      // whenever we run through this origin coming from the table
      // we memoize the tableState to have it available in #2
      tableFeatureRef.current = tableState;

      callback(type, tableState, thirdPartyState);
    },
    [callback]
  );

  const dependenciesPrev = usePrevious(dependencies);

  // #2 react to thirdPartyState change
  React.useEffect(() => {
    const thirdPartyState = dependenciesToState(dependencies);

    // whenever we run through this origin coming from outside of table
    // we memoize the thirdPartyState to have it available in #3
    thirdPartyStateRef.current = thirdPartyState;

    Object.keys(dependencies).forEach(key => {
      const dependencyChanged =
        dependenciesPrev &&
        !isEqual(
          dependencies[key].stateValue,
          dependenciesPrev[key].stateValue
        );

      if (dependencyChanged) {
        const type = key;

        // for the changed dependency
        // call #1 with the memoized tableState
        firstEnhancedCallback(
          type,
          tableFeatureRef.current,
          thirdPartyState
        );
      }
    });
  }, [dependenciesPrev, dependencies, firstEnhancedCallback]);

  // #3
  const secondEnhancedCallback = (type, tableState) =>
    firstEnhancedCallback(
      type,
      tableState,
      // whenever we run through this origin coming from the table
      // we use the memoized thirdPartyState from #2
      thirdPartyStateRef.current
    );

  return secondEnhancedCallback;
};
