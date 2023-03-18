import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useTree } from '@table-library/react-table-library/tree';

import { DocumentationSee } from '../documentation';
import { nodes } from '../data';

const Component = () => {
  const data = { nodes };

  const theme = useTheme(getTheme());

  const tree = useTree(data, {
    onChange: onTreeChange,
  });

  function onTreeChange(action, state) {
    console.log(action, state);
  }

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, tree: true },
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

  return (
    <>
      <CompactTable columns={COLUMNS} data={data} theme={theme} tree={tree} />

      <br />
      <DocumentationSee anchor={'Features/Tree'} />
    </>
  );
};

export default Component;
