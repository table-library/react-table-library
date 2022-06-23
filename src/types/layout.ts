import * as React from 'react';

// external

export type Layout = {
  custom?: boolean;
  horizontalScroll?: boolean;
  fixedHeader?: boolean;
  isDiv?: boolean;
  resizedLayout?: string;
  onLayoutChange?: (grid: string) => void;
};

// internal

export type TableMemory = {
  resizedLayout: string;
  hiddenSpacesInMemory: (number | null)[];
};

export type TableMemoryRef = React.MutableRefObject<TableMemory | null>;

export type TableElementRef = React.MutableRefObject<HTMLTableElement | null>;
