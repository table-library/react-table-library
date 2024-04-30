import * as React from 'react';

import { Body } from '@overmap-ai/react-table-library/table/index';

import { TableNode } from '@overmap-ai/react-table-library/types/table';
import { NormalTableProps } from '@overmap-ai/react-table-library/types/compact';

import { CompactHeader } from './CompactHeader';
import { CompactRow } from './CompactRow';

export const NormalTable = <T extends TableNode>({
  tableList,
  columns,
  rowProps = {},
  rowOptions,
  ...tableProps
}: NormalTableProps<T>) => {
  return (
    <React.Fragment>
      <CompactHeader columns={columns} {...tableProps} />

      <Body>
        {tableList.map((item: T, index: number) => (
          <CompactRow
            key={item.id}
            index={index}
            item={item}
            columns={columns}
            rowProps={rowProps}
            rowOptions={rowOptions}
            {...tableProps}
          />
        ))}
      </Body>
    </React.Fragment>
  );
};
