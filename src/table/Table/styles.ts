/* eslint-disable @typescript-eslint/indent */

type Configuration = {
  isShiftDown: boolean;
};

export default (configuration: Configuration) => `
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  overflow: auto;
  position: relative;

  border-collapse: collapse;

  display: grid;

  --data-table-library_grid-template-columns: '';
  grid-template-columns: var(--data-table-library_grid-template-columns);

  ${
    configuration.isShiftDown
      ? `
    user-select: none; /* standard syntax */
    -webkit-user-select: none; /* webkit (safari, chrome) browsers */
    -moz-user-select: none; /* mozilla browsers */
    -khtml-user-select: none; /* webkit (konqueror) browsers */
    -ms-user-select: none; /* IE10+ */
    `
      : ''
  }
  `;

/* eslint-enable @typescript-eslint/indent */
