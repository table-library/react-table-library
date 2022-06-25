import * as React from 'react';

import { DataColumn } from '@table-library/react-table-library/common/util/columns';

import { Nullish } from '@table-library/react-table-library/types/common';

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
  dataColumns: DataColumn[];
  hiddenSpacesInMemory: (number | Nullish)[];
};

export type TableMemoryRef = React.MutableRefObject<TableMemory | null>;

export type TableElementRef = React.MutableRefObject<HTMLTableElement | null>;
