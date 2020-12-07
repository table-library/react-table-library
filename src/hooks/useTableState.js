import * as React from 'react';
import isEqual from 'lodash.isequal';

import { usePrevious } from '@util/usePrevious';

export const useTableState = (callback, dependencies) => {
  const tableStateRef = React.useRef();

  const dependenciesPrev = usePrevious(dependencies);

  const enhancedCallback = React.useCallback(
    (type, tableState, thirdPartyState = {}) => {
      tableStateRef.current = tableState;

      callback(type, tableState, thirdPartyState);
    },
    [callback]
  );

  React.useEffect(() => {
    const thirdPartyState = Object.keys(dependencies).reduce(
      (acc, key) => ({
        ...acc,
        [dependencies[key].stateKey]: dependencies[key].stateValue
      }),
      {}
    );

    Object.keys(dependencies).forEach(key => {
      const dependencyChanged =
        dependenciesPrev &&
        !isEqual(
          dependencies[key].stateValue,
          dependenciesPrev[key].stateValue
        );

      if (dependencyChanged) {
        enhancedCallback(key, tableStateRef.current, thirdPartyState);
      }
    });
  }, [dependenciesPrev, dependencies, enhancedCallback]);

  return enhancedCallback;
};
