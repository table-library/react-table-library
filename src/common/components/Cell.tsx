import * as React from 'react';

const getBaseStyle = (props: Record<string, any>) => {
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

const getCellContainerStyle = (props: Record<string, any>) => `
  [data-table-library="td"] {
    ${getBaseStyle(props)}
  }
`;

const CellContainer = React.forwardRef(
  ({ children, ...props }: Record<string, any>, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div {...props} ref={ref} data-table-library="td">
        <style dangerouslySetInnerHTML={{ __html: getCellContainerStyle(props) }} />
        {children}
      </div>
    );
  },
);

const getHeaderCellContainerStyle = (props: Record<string, any>) => `
  [data-table-library="th"] {
    ${getBaseStyle(props)}
  }
`;

const HeaderCellContainer = React.forwardRef(
  ({ children, ...props }: Record<string, any>, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div {...props} ref={ref} data-table-library="th">
        <style dangerouslySetInnerHTML={{ __html: getHeaderCellContainerStyle(props) }} />
        {children}
      </div>
    );
  },
);

export { CellContainer, HeaderCellContainer };
