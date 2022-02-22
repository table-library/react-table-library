/* eslint-disable react/prop-types */
import * as React from 'react';

import { Body } from '@table-library/react-table-library/table/index';

import { TableNode } from '@table-library/react-table-library/types/table';
import { NormalTableProps } from '@table-library/react-table-library/types/compact';

import { CompactHeader } from './CompactHeader';
import { CompactRow } from './CompactRow';

const NormalTable = ({
  tableList,
  columns,
  rowProps = {},
  rowOptions,
  ...tableProps
}: NormalTableProps) => {
  return (
    <>
      <CompactHeader columns={columns} {...tableProps} />

      <Body>
        {tableList.map((item: TableNode) => (
          <CompactRow
            key={item.id}
            item={item}
            columns={columns}
            rowProps={rowProps}
            rowOptions={rowOptions}
            {...tableProps}
          />
        ))}
      </Body>
    </>
  );
};

export { NormalTable };
