import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import {
  DEFAULT_OPTIONS,
  getMantineTheme,
} from '@table-library/react-table-library/themes/mantine';
import { Button } from '@mantine/core';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Column Ordering';

const Component = () => {
  const data = { nodes };

  const mantineTheme = getMantineTheme(DEFAULT_OPTIONS);
  const theme = useTheme(mantineTheme);

  const [columns, setColumns] = React.useState([
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
  ]);

  const handleOrder = () => {
    setColumns([...columns].sort(() => 0.5 - Math.random()));
  };

  return (
    <>
      <Button onClick={handleOrder}>Shuffle</Button>

      <CompactTable columns={columns} data={data} theme={theme} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import {
  DEFAULT_OPTIONS,
  getMantineTheme,
} from '@table-library/react-table-library/themes/mantine';
import { Button } from '@mantine/core';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Column Ordering';

const Component = () => {
  const data = { nodes };

  const mantineTheme = getMantineTheme(DEFAULT_OPTIONS);
  const theme = useTheme(mantineTheme);

  const [columns, setColumns] = React.useState([
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
  ]);

  const handleOrder = () => {
    setColumns([...columns].sort(() => 0.5 - Math.random()));
  };

  return (
    <>
      <Button onClick={handleOrder}>Shuffle</Button>

      <CompactTable columns={columns} data={data} theme={theme} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
