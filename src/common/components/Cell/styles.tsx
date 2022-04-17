const base = (props: Record<string, any>) => {
  let optionalString = '';

  // TODO (do in useHide hook by altering style instead of className)
  // if (props.className.includes('hide')) {
  //   optionalString = `
  //     ${optionalString}

  //     display: none;
  //   `;
  // }

  if (props.className.includes('pin-left') || props.className.includes('pin-right')) {
    optionalString = `
      [data-table-library_td-pin] {
        ${optionalString}

        position: sticky;
        z-index: 3;
      }
    `;
  }

  return `
    display: flex;
    align-items: center;

    ${optionalString}
  `;
};

export const cell = (props: Record<string, any>) => `
  [data-table-library_td] {
    ${base(props)}
  }
`;

export const headerCell = (props: Record<string, any>) => `
  [data-table-library_th] {
    ${base(props)}
  }
`;
