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

export { LayoutContext, LayoutProvider };
