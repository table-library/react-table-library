type ColumnResizePropsObject = {
  minWidth?: number;
  resizerWidth?: number;
  resizerHighlight?: string;
  onDragMove?: (widths: string[]) => void;
  onDragEnd?: (widths: string[]) => void;
};

export type ColumnResizeProps = ColumnResizePropsObject | boolean;
