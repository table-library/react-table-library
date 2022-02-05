type ResizePropBoolean = boolean;

type ResizePropObject = {
  minWidth?: number;
  resizerWidth?: number;
  resizerHighlight?: string;
};

export type ResizeProp = ResizePropObject | ResizePropBoolean;
