import * as React from 'react';

import { Row, Cell } from '@table-library/react-table-library/table/index';

import { TableNode } from '@table-library/react-table-library/types/table';
import { CompactTableProps, Column } from '@table-library/react-table-library/types/compact';

const evaluateProps = (props: Record<string, any>, item: TableNode) =>
  Object.keys(props).reduce((acc: Record<string, any>, key: string) => {
    if (typeof props[key] === 'function') {
      acc[key] = props[key](item);
    } else {
      acc[key] = props[key];
    }

    return acc;
  }, {});

const CompactRow = ({
  item,
  columns,
  rowProps,
  rowOptions,
  ...tableProps
}: { item: TableNode } & CompactTableProps) => {
  const { tree, select } = tableProps;

  return (
    <>
      {rowOptions?.renderBeforeRow && rowOptions.renderBeforeRow(item)}

      <Row item={item} {...rowProps}>
        {columns.map((column: Column, index: number) => {
          const sharedProps = {
            pin: column.pin,
          };

          const evaluatedCellProps = evaluateProps(column?.cellProps || {}, item);

          let cell = null;
          if (tree && column.tree) {
            let featureProps = {};
            if (typeof column.tree !== 'boolean') {
              featureProps = { ...featureProps, treeIcon: column.tree.treeIcon };
            }

            cell = (
              <tree.components.CellTree
                item={item}
                {...evaluatedCellProps}
                {...sharedProps}
                {...featureProps}
              >
                {column.renderCell(item)}
              </tree.components.CellTree>
            );
          } else {
            cell = (
              <Cell {...evaluatedCellProps} {...sharedProps}>
                {column.renderCell(item)}
              </Cell>
            );
          }

          // select feature

          let checkbox = null;
          if (select && column.select) {
            checkbox = <select.components.CellSelect item={item} />;
          }

          return (
            <React.Fragment key={index}>
              {checkbox}
              {cell}
            </React.Fragment>
          );
        })}
      </Row>

      {rowOptions?.renderAfterRow && rowOptions.renderAfterRow(item)}
    </>
  );
};

export { CompactRow };
