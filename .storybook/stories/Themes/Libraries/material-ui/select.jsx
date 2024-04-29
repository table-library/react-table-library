import * as React from 'react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@overmap-ai/react-table-library/material-ui';
import { useRowSelect } from '@overmap-ai/react-table-library/select';
import { Checkbox } from '@mui/material';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Select';

const Component = () => {
  const data = { nodes };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const customTheme = {
    Table: `
      --data-table-library_grid-template-columns:  70px repeat(5, minmax(0, 1fr));
    `,
  };
  const theme = useTheme([materialTheme, customTheme]);

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onSelectChange(action, state) {
    console.log(action, state);
  }

  const COLUMNS = [
    {
      label: 'Task',
      renderCell: (item) => item.name,
      select: {
        renderHeaderCellSelect: () => (
          <Checkbox
            size="small"
            checked={select.state.all}
            indeterminate={!select.state.all && !select.state.none}
            onChange={select.fns.onToggleAll}
          />
        ),
        renderCellSelect: (item) => (
          <Checkbox
            size="small"
            checked={select.state.ids.includes(item.id)}
            onChange={() => select.fns.onToggleById(item.id)}
          />
        ),
      },
    },
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
      <CompactTable columns={COLUMNS} data={data} theme={theme} select={select} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@overmap-ai/react-table-library/material-ui';
import { useRowSelect } from '@overmap-ai/react-table-library/select';
import { Checkbox } from '@mui/material';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Select';

const Component = () => {
  const data = { nodes };

const materialTheme = getTheme(DEFAULT_OPTIONS);
  const customTheme = {
    Table: \`
      --data-table-library_grid-template-columns:  70px repeat(5, minmax(0, 1fr));
    \`,
  };
  const theme = useTheme([materialTheme, customTheme]);

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onSelectChange(action, state) {
    console.log(action, state);
  }

  const COLUMNS = [
    {
      label: 'Task',
      renderCell: (item) => item.name,
      select: {
        renderHeaderCellSelect: () => (
          <Checkbox
            size="small"
            checked={select.state.all}
            indeterminate={!select.state.all && !select.state.none}
            onChange={select.fns.onToggleAll}
          />
        ),
        renderCellSelect: (item) => (
          <Checkbox
            size="small"
            checked={select.state.ids.includes(item.id)}
            onChange={() => select.fns.onToggleById(item.id)}
          />
        ),
      },
    },
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
      <CompactTable columns={COLUMNS} data={data} theme={theme} select={select} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
