import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';

import { DocumentationSee } from '../documentation';
import { nodes } from '../data';

const key = 'Horizontal Scroll';

const Component = () => {
  const data = { nodes };

  const theme = useTheme({
    BaseCell: `
      &:nth-of-type(1) {
        min-width: 50%;
        width: 50%;
      }

      &:nth-of-type(2) {
        min-width: 200px;
        width: 200px;
      }

      &:nth-of-type(3), &:nth-of-type(4) {
        min-width: 25%;
        width: 25%;
      }

      &:nth-of-type(5) {
        min-width: 50%;
        width: 50%;
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
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        layout={{ custom: true, horizontalScroll: true }}
      />

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

const key = 'Horizontal Scroll';

const Component = () => {
  const data = { nodes };

  const theme = useTheme({
    BaseCell: \`
      &:nth-of-type(1) {
        min-width: 50%;
        width: 50%;
      }

      &:nth-of-type(2) {
        min-width: 200px;
        width: 200px;
      }

      &:nth-of-type(3), &:nth-of-type(4) {
        min-width: 25%;
        width: 25%;
      }

      &:nth-of-type(5) {
        min-width: 50%;
        width: 50%;
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
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        layout={{ custom: true, horizontalScroll: true }}
      />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
