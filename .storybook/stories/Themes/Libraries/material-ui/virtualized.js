import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { Paper } from '@mui/material';

import { DocumentationSee } from '../../../documentation';
import { manyNodes } from '../../../data';

const key = 'Virtualized';

const Component = () => {
  const data = { nodes: manyNodes };

  const materialTheme = getTheme(DEFAULT_OPTIONS, { isVirtualized: true });
  const theme = useTheme(materialTheme);

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
    rowHeight: (_item, _index) => 54,
  };

  return (
    <>
      <Paper variant="outlined" square style={{ height: '300px' }}>
        <CompactTable
          columns={COLUMNS}
          virtualizedOptions={VIRTUALIZED_OPTIONS}
          data={data}
          theme={theme}
        />
      </Paper>

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
import { Paper } from '@mui/material';

import { DocumentationSee } from '../../../documentation';
import { manyNodes } from '../../../data';

const key = 'Virtualized';

const Component = () => {
  const data = { nodes: manyNodes };

  const materialTheme = getTheme(DEFAULT_OPTIONS, { isVirtualized: true });
  const theme = useTheme(materialTheme);

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
    rowHeight: (_item, _index) => 54,
  };

  return (
    <>
      <Paper variant="outlined" square style={{ height: '300px' }}>
        <CompactTable
          columns={COLUMNS}
          virtualizedOptions={VIRTUALIZED_OPTIONS}
          data={data}
          theme={theme}
        />
      </Paper>

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
