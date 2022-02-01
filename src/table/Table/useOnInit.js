import * as React from 'react';

export const useOnInit = (onInit, tableElementRef) => {
  const [calledOnce, setCalledOnce] = React.useState(false);
  const callbackRef = (node) => {
    if (!node) return;

    if (calledOnce) return;
    setCalledOnce(true);

    tableElementRef.current = node;
    onInit(node);
  };

  return [calledOnce, callbackRef];
};
