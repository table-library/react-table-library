import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/themes/material-ui';
import { Stack, Checkbox, FormGroup, FormControlLabel } from '@mui/material';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Column Hiding';

const Component = () => {
  const data = { nodes };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);

  const [hiddenColumns, setHiddenColumns] = React.useState(['DEADLINE', 'COMPLETE']);

  const toggleColumn = (column) => {
    if (hiddenColumns.includes(column)) {
      setHiddenColumns(hiddenColumns.filter((v) => v !== column));
    } else {
      setHiddenColumns(hiddenColumns.concat(column));
    }
  };

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, hide: { hideKey: 'TASK' } },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      hide: { hideKey: 'DEADLINE' },
    },
    { label: 'Type', renderCell: (item) => item.type, hide: { hideKey: 'TYPE' } },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
      hide: { hideKey: 'COMPLETE' },
    },
    { label: 'Tasks', renderCell: (item) => item.nodes?.length, hide: { hideKey: 'TASKS' } },
  ];

  return (
    <>
      <Stack spacing={10}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={!hiddenColumns.includes('NAME')}
                onChange={() => toggleColumn('NAME')}
              />
            }
            label="Name"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!hiddenColumns.includes('DEADLINE')}
                onChange={() => toggleColumn('DEADLINE')}
              />
            }
            label="Deadline"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!hiddenColumns.includes('TYPE')}
                onChange={() => toggleColumn('TYPE')}
              />
            }
            label="Type"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!hiddenColumns.includes('COMPLETE')}
                onChange={() => toggleColumn('COMPLETE')}
              />
            }
            label="Complete"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!hiddenColumns.includes('TASKS')}
                onChange={() => toggleColumn('TASKS')}
              />
            }
            label="Tasks"
          />
        </FormGroup>
      </Stack>

      <CompactTable columns={COLUMNS} data={data} theme={theme} layout={{ hiddenColumns }} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/themes/material-ui';
import { Stack, Checkbox, FormGroup, FormControlLabel } from '@mui/material';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Column Hiding';

const Component = () => {
  const data = { nodes };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);

  const [hiddenColumns, setHiddenColumns] = React.useState(['DEADLINE', 'COMPLETE']);

  const toggleColumn = (column) => {
    if (hiddenColumns.includes(column)) {
      setHiddenColumns(hiddenColumns.filter((v) => v !== column));
    } else {
      setHiddenColumns(hiddenColumns.concat(column));
    }
  };

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, hide: { hideKey: 'TASK' } },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      hide: { hideKey: 'DEADLINE' },
    },
    { label: 'Type', renderCell: (item) => item.type, hide: { hideKey: 'TYPE' } },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
      hide: { hideKey: 'COMPLETE' },
    },
    { label: 'Tasks', renderCell: (item) => item.nodes?.length, hide: { hideKey: 'TASKS' } },
  ];

  return (
    <>
      <Stack spacing={10}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={!hiddenColumns.includes('NAME')}
                onChange={() => toggleColumn('NAME')}
              />
            }
            label="Name"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!hiddenColumns.includes('DEADLINE')}
                onChange={() => toggleColumn('DEADLINE')}
              />
            }
            label="Deadline"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!hiddenColumns.includes('TYPE')}
                onChange={() => toggleColumn('TYPE')}
              />
            }
            label="Type"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!hiddenColumns.includes('COMPLETE')}
                onChange={() => toggleColumn('COMPLETE')}
              />
            }
            label="Complete"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!hiddenColumns.includes('TASKS')}
                onChange={() => toggleColumn('TASKS')}
              />
            }
            label="Tasks"
          />
        </FormGroup>
      </Stack>

      <CompactTable columns={COLUMNS} data={data} theme={theme} layout={{ hiddenColumns }} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
