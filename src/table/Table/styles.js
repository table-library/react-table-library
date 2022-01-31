export default (layout, configuration) => `
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  overflow-x: ${layout?.horizontalScroll ? 'auto' : 'hidden'};
  overflow-y: auto;
  position: relative;

 ${
   configuration.isShiftDown
     ? `
        user-select: none; /* standard syntax */
        -webkit-user-select: none; /* webkit (safari, chrome) browsers */
        -moz-user-select: none; /* mozilla browsers */
        -khtml-user-select: none; /* webkit (konqueror) browsers */
        -ms-user-select: none; /* IE10+ */
      `
     : ``
 }
`;
