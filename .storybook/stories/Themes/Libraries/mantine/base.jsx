import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/mantine';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Base';

const Component = () => {
  const data = { nodes };

  const mantineTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(mantineTheme);

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
      <DocumentationSee noLink anchor={'Features'} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import {
  DEFAULT_OPTIONS,
  getTheme,
} from '@table-library/react-table-library/mantine';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Base';

const Component = () => {
  const data = { nodes };

  const mantineTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(mantineTheme);

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
      <DocumentationSee noLink anchor={'Features'} />
    </>
  );
};
`;

export { key, Component, code };
