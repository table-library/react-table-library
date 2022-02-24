import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';

import { DocumentationSee } from '../documentation';
import { nodes } from '../data';

const key = 'Resize';

const Component = () => {
  const data = { nodes };

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
    { label: 'Tasks', renderCell: (item) => item.nodes?.length, resize: true },
  ];

  return (
    <>
      <CompactTable columns={COLUMNS} data={data} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';

import { DocumentationSee } from '../documentation';
import { nodes } from '../data';

const key = 'Resize';

const Component = () => {
  const data = { nodes };

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
    { label: 'Tasks', renderCell: (item) => item.nodes?.length, resize: true },
  ];

  return (
    <>
      <CompactTable columns={COLUMNS} data={data} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
