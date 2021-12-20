export default (layout) => `
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  overflow-x: ${layout?.horizontalScroll ? 'auto' : 'hidden'};
  overflow-y: auto;
  position: relative;
`;
