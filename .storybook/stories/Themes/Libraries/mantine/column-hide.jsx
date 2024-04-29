import * as React from 'react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@overmap-ai/react-table-library/mantine';
import { Group, Checkbox } from '@mantine/core';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Column Hiding';

const Component = () => {
  const data = { nodes };

  const mantineTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(mantineTheme);

  const [hiddenColumns, setHiddenColumns] = React.useState(['DEADLINE', 'COMPLETE']);

  const toggleColumn = (column) => {
    if (hiddenColumns.includes(column)) {
      setHiddenColumns(hiddenColumns.filter((v) => v !== column));
    } else {
      setHiddenColumns(hiddenColumns.concat(column));
    }
  };

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, hide: hiddenColumns.includes('TASK') },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      hide: hiddenColumns.includes('DEADLINE'),
    },
    { label: 'Type', renderCell: (item) => item.type, hide: hiddenColumns.includes('TYPE') },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
      hide: hiddenColumns.includes('COMPLETE'),
    },
    {
      label: 'Tasks',
      renderCell: (item) => item.nodes?.length,
      hide: hiddenColumns.includes('TASKS'),
    },
  ];

  return (
    <>
      <Group m={10}>
        <Checkbox
          label="Name"
          checked={!hiddenColumns.includes('NAME')}
          onChange={() => toggleColumn('NAME')}
        />
        <Checkbox
          label="Deadline"
          checked={!hiddenColumns.includes('DEADLINE')}
          onChange={() => toggleColumn('DEADLINE')}
        />
        <Checkbox
          label="Type"
          checked={!hiddenColumns.includes('TYPE')}
          onChange={() => toggleColumn('TYPE')}
        />
        <Checkbox
          label="Complete"
          checked={!hiddenColumns.includes('COMPLETE')}
          onChange={() => toggleColumn('COMPLETE')}
        />
        <Checkbox
          label="Tasks"
          checked={!hiddenColumns.includes('TASKS')}
          onChange={() => toggleColumn('TASKS')}
        />
      </Group>

      <CompactTable columns={COLUMNS} data={data} theme={theme} layout={{ hiddenColumns }} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@overmap-ai/react-table-library/mantine';
import { Group, Checkbox } from '@mantine/core';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Column Hiding';

const Component = () => {
  const data = { nodes };

  const mantineTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(mantineTheme);

  const [hiddenColumns, setHiddenColumns] = React.useState(['DEADLINE', 'COMPLETE']);

  const toggleColumn = (column) => {
    if (hiddenColumns.includes(column)) {
      setHiddenColumns(hiddenColumns.filter((v) => v !== column));
    } else {
      setHiddenColumns(hiddenColumns.concat(column));
    }
  };

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, hide: hiddenColumns.includes('TASK') },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      hide: hiddenColumns.includes('DEADLINE'),
    },
    { label: 'Type', renderCell: (item) => item.type, hide: hiddenColumns.includes('TYPE') },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
      hide: hiddenColumns.includes('COMPLETE'),
    },
    {
      label: 'Tasks',
      renderCell: (item) => item.nodes?.length,
      hide: hiddenColumns.includes('TASKS'),
    },
  ];

  return (
    <>
      <Group m={10}>
        <Checkbox
          label="Name"
          checked={!hiddenColumns.includes('NAME')}
          onChange={() => toggleColumn('NAME')}
        />
        <Checkbox
          label="Deadline"
          checked={!hiddenColumns.includes('DEADLINE')}
          onChange={() => toggleColumn('DEADLINE')}
        />
        <Checkbox
          label="Type"
          checked={!hiddenColumns.includes('TYPE')}
          onChange={() => toggleColumn('TYPE')}
        />
        <Checkbox
          label="Complete"
          checked={!hiddenColumns.includes('COMPLETE')}
          onChange={() => toggleColumn('COMPLETE')}
        />
        <Checkbox
          label="Tasks"
          checked={!hiddenColumns.includes('TASKS')}
          onChange={() => toggleColumn('TASKS')}
        />
      </Group>

      <CompactTable columns={COLUMNS} data={data} theme={theme} layout={{ hiddenColumns }} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
