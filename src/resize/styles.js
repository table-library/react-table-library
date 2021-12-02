const resizerStyle = (resize) => {
  const width = resize.resizerWidth || 3;
  const highlight = resize.resizerHighlight || 'transparent';

  return `
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    cursor: col-resize;
    width: ${width}px;

    background-color: transparent;
    transition: background-color 0.1s linear;

    &:hover {
      background-color: ${highlight};
    }
  `;
};

export { resizerStyle };
