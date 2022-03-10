import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';

import { DocumentationSee } from '../documentation';
import { nodes } from '../data';

const key = 'Theme';

const Component = () => {
  const data = { nodes };

  const theme = useTheme({
    HeaderRow: `
      background-color: #eaf5fd;
    `,
    Row: `
      &:nth-of-type(odd) {
        background-color: #d2e9fb;
      }

      &:nth-of-type(even) {
        background-color: #eaf5fd;
      }
    `,
  });

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

  return (
    <>
      <CompactTable columns={COLUMNS} data={data} theme={theme} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';

import { DocumentationSee } from '../documentation';
import { nodes } from '../data';

const key = 'Theme';

const Component = () => {
  const data = { nodes };

  const theme = useTheme({
    HeaderRow: \`
      background-color: #eaf5fd;
    \`,
    Row: \`
      &:nth-of-type(odd) {
        background-color: #d2e9fb;
      }

      &:nth-of-type(even) {
        background-color: #eaf5fd;
      }
    \`,
  });

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

  return (
    <>
      <CompactTable columns={COLUMNS} data={data} theme={theme} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
