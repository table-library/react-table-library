import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

import { DocumentationSee } from '../documentation';
import { nodes } from '../data';

const Component = () => {
  const data = { nodes };

  const theme = useTheme(getTheme());

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, resize: true },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      resize: true,
    },
    { label: 'Type', renderCell: (item) => item.type, resize: true },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
      resize: true,
    },
    { label: 'Tasks', renderCell: (item) => item.nodes?.length },
  ];

  return (
    <>
      <CompactTable columns={COLUMNS} data={data} theme={theme} />

      <br />
      <DocumentationSee anchor={'Features/Resize'} />
    </>
  );
};

export default Component;
