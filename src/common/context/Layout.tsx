import * as React from 'react';

import { Nullish } from '@table-library/react-table-library/types/common';
import {
  Layout,
  TableMemoryRef,
  TableElementRef,
} from '@table-library/react-table-library/types/layout';

type Value = {
  tableElementRef: TableElementRef;
  tableMemoryRef: TableMemoryRef;
  layout: Layout | Nullish;
};

const LayoutContext = React.createContext<Value | Nullish>(null);

type LayoutProviderProps = {
  tableElementRef: TableElementRef;
  tableMemoryRef: TableMemoryRef;
  layout: Layout | Nullish;
  children: React.ReactNode;
};

const LayoutProvider = ({
  tableElementRef,
  tableMemoryRef,
  layout,
  children,
}: LayoutProviderProps) => {
  const value = React.useMemo(
    () => ({
      layout,
      tableElementRef,
      tableMemoryRef,
    }),
    [layout, tableElementRef, tableMemoryRef],
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

const setResizedLayout = (resizedLayout: string, tableElementRef: TableElementRef) => {
  const previousResizedLayout = tableElementRef.current!.style.getPropertyValue(
    '--data-table-library_grid-template-columns',
  );

  const didChange = previousResizedLayout !== resizedLayout;

  if (tableElementRef.current && resizedLayout && didChange) {
    tableElementRef.current.style.setProperty(
      '--data-table-library_grid-template-columns',
      resizedLayout,
    );
  }
};

const propagateResizedLayout = (resizedLayout: string, layout: Layout | Nullish) => {
  if (layout?.onLayoutChange && resizedLayout) {
    layout.onLayoutChange(resizedLayout);
  }
};

export { LayoutContext, LayoutProvider, setResizedLayout, propagateResizedLayout };
