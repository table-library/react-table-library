import * as React from 'react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { getTheme } from '@overmap-ai/react-table-library/baseline';

import { DocumentationSee } from '../documentation';
import { manyNodes } from '../data';

const Component = () => {
  const data = { nodes: manyNodes };

  const theme = useTheme(getTheme());

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
    },
    { label: 'Type', renderCell: (item) => item.type },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
    },
    { label: 'Tasks', renderCell: (item) => item.nodes?.length },
  ];

  const VIRTUALIZED_OPTIONS = {
    rowHeight: (_item, _index) => 33,
  };

  return (
    <>
      <div style={{ height: '300px' }}>
        <CompactTable
          columns={COLUMNS}
          virtualizedOptions={VIRTUALIZED_OPTIONS}
          data={data}
          theme={theme}
          layout={{ isDiv: true, fixedHeader: true }}
        />
      </div>

      <br />
      <DocumentationSee anchor={'Features/Virtualized'} />
    </>
  );
};

export default Component;
