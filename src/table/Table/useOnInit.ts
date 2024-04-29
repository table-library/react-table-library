import * as React from 'react';

import { OnInitFunction } from '@overmap-ai/react-table-library/types/table';
import { TableElementRef } from '@overmap-ai/react-table-library/types/layout';

export const useOnInit = (
  onInit: OnInitFunction,
  tableElementRef: TableElementRef,
): [boolean, OnInitFunction] => {
  const [calledOnce, setCalledOnce] = React.useState(false);

  const callbackRef = (node: HTMLTableElement) => {
    if (!node) return;

    if (calledOnce) return;
    setCalledOnce(true);

    tableElementRef.current = node;

    onInit(node);
  };

  return [calledOnce, callbackRef];
};
