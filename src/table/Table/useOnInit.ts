import * as React from 'react';

import { TableElementRef } from '@table-library/react-table-library/types/layout';

export type OnInitFunction = (node: HTMLDivElement) => void;

export const useOnInit = (
  onInit: OnInitFunction,
  tableElementRef: TableElementRef,
): [boolean, OnInitFunction] => {
  const [calledOnce, setCalledOnce] = React.useState(false);

  const callbackRef = (node: HTMLDivElement) => {
    if (!node) return;

    if (calledOnce) return;
    setCalledOnce(true);

    tableElementRef.current = node;
    onInit(node);
  };

  return [calledOnce, callbackRef];
};
