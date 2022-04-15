import * as React from 'react';

const BASE_STYLE = (props: Record<string, any>) => {
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
      ${optionalString}

      position: sticky;
      z-index: 3;
    `;
  }

  return `
    display: flex;
    align-items: center;

    ${optionalString}
  `;
};

const CELL_CONTAINER_STYLE = (props: Record<string, any>) => `
  .td {
    ${BASE_STYLE(props)}
  }
`;

const CellContainer = React.forwardRef(
  ({ children, ...props }: Record<string, any>, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div {...props} ref={ref}>
        <style>{CELL_CONTAINER_STYLE(props)}</style>
        {children}
      </div>
    );
  },
);

const HEADER_CELL_CONTAINER_STYLE = (props: Record<string, any>) => `
  .th {
    ${BASE_STYLE(props)}
  }
`;

const HeaderCellContainer = React.forwardRef(
  ({ children, ...props }: Record<string, any>, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div {...props} ref={ref}>
        <style>{HEADER_CELL_CONTAINER_STYLE(props)}</style>
        {children}
      </div>
    );
  },
);

export { CellContainer, HeaderCellContainer };
