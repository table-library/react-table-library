import { styled } from '@stitches/react';
import { ColumnResizeProps } from '@table-library/react-table-library/types/resize';

const ResizerBlueprint = (resize: ColumnResizeProps) => {
  const width =
    typeof resize === 'boolean' || resize?.resizerWidth == null ? 3 : resize.resizerWidth;

  const highlight =
    typeof resize === 'boolean' || resize?.resizerHighlight == null
      ? 'transparent'
      : resize.resizerHighlight;

  return styled('span', {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    cursor: 'col-resize',
    width: `${width}px`,

    backgroundColor: 'transparent',
    transition: 'background-color 0.1s linear',

    '&:hover': {
      backgroundColor: `${highlight}`,
    },
  });
};

export { ResizerBlueprint };
