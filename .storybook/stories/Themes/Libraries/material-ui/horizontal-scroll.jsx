import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Horizontal Scroll';

const Component = () => {
  const data = { nodes };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const customTheme = {
    Table: `
      --data-table-library_grid-template-columns:  25% 25% 25% 25% minmax(150px, 1fr);
    `,
  };
  const theme = useTheme([materialTheme, customTheme]);

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
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Horizontal Scroll';

const Component = () => {
  const data = { nodes };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const customTheme = {
    Table: \`
      --data-table-library_grid-template-columns:  25% 25% 25% 25% minmax(150px, 1fr);
    \`,
  };
  const theme = useTheme([materialTheme, customTheme]);

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
