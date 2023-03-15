import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { Stack, Checkbox, FormGroup, FormControlLabel } from '@mui/material';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Filter';

const Component = () => {
  let data = { nodes };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);

  const [isHide, setHide] = React.useState(false);

  data = {
    nodes: isHide ? data.nodes.filter((node) => !node.isComplete) : data.nodes,
  };

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
      <Stack spacing={10}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={isHide} onChange={(event) => setHide(event.target.checked)} />
            }
            label="Hide Complete"
          />
        </FormGroup>
      </Stack>

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
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { Stack, Checkbox, FormGroup, FormControlLabel } from '@mui/material';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Filter';

const Component = () => {
  let data = { nodes };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);

  const [isHide, setHide] = React.useState(false);

  data = {
    nodes: isHide ? data.nodes.filter((node) => !node.isComplete) : data.nodes,
  };

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
      <Stack spacing={10}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={isHide} onChange={(event) => setHide(event.target.checked)} />
            }
            label="Hide Complete"
          />
        </FormGroup>
      </Stack>

      <CompactTable columns={COLUMNS} data={data} theme={theme} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
