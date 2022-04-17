export const button = (props: Record<string, any>) => {
  let optionalStringButton = '';

  if (props.className.includes('narrow')) {
    optionalStringButton = `
      ${optionalStringButton}

      width: auto;
    `;
  }

  return `
    [data-table-library_button] {
      display: flex;
      align-items: center;

      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;

      width: 100%;
      height: 100%;

      ${optionalStringButton}
    }
  `;
};
