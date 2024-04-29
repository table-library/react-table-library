import * as React from 'react';

import { Row, Cell } from '@overmap-ai/react-table-library/table/index';

import { TableNode } from '@overmap-ai/react-table-library/types/table';
import { CompactTableProps, Column } from '@overmap-ai/react-table-library/types/compact';

const evaluateProps = <T extends TableNode>(props: Record<string, any>, item: T) =>
  Object.keys(props).reduce((acc: Record<string, any>, key: string) => {
    if (typeof props[key] === 'function') {
      acc[key] = props[key](item);
    } else {
      acc[key] = props[key];
    }

    return acc;
  }, {});

type CompactRowProps<T extends TableNode> = { item: T; index: number } & CompactTableProps<T>;

export const CompactRow = <T extends TableNode>({
  index,
  item,
  columns,
  rowProps,
  rowOptions,
  ...tableProps
}: CompactRowProps<T>) => {
  const { tree, select } = tableProps;

  return (
    <React.Fragment>
      {rowOptions?.renderBeforeRow && rowOptions.renderBeforeRow(item, index)}

      <Row item={item} {...rowProps}>
        {columns.map((column: Column<T>, jindex: number) => {
          const sharedProps = {
            pinLeft: column.pinLeft,
            pinRight: column.pinRight,
            hide: column.hide,
          };

          const evaluatedCellProps = evaluateProps<T>(column?.cellProps || {}, item);

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
            checkbox =
              typeof column.select !== 'boolean' && column.select.renderCellSelect ? (
                <Cell stiff>{column.select.renderCellSelect(item)}</Cell>
              ) : (
                <select.components.CellSelect item={item} />
              );
          }

          return (
            <React.Fragment key={jindex}>
              {checkbox}
              {cell}
            </React.Fragment>
          );
        })}
      </Row>

      {rowOptions?.renderAfterRow && rowOptions.renderAfterRow(item, index)}
    </React.Fragment>
  );
};
