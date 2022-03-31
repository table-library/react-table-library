// external

export type Layout = {
  custom?: boolean;
  horizontalScroll?: boolean;
  hiddenColumns?: string[];
  fullHeight?: boolean;
  inheritLayout?: boolean;
  resizedLayout?: string[];
  onLayoutChange?: (widths: string[]) => void;
};

// internal

export type TableMemory = {
  resizedLayout: (string | null)[];
  hiddenSpacesInMemory: (number | null)[];
};

export type TableMemoryRef = React.MutableRefObject<TableMemory | null>;

export type TableElementRef = React.MutableRefObject<HTMLDivElement | null>;
