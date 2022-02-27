import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/themes/material-ui';
import { usePagination } from '@table-library/react-table-library/pagination';
import { Stack, TablePagination } from '@mui/material';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Pagination';

const Component = () => {
  const data = { nodes };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 2,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

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
      <CompactTable columns={COLUMNS} data={data} theme={theme} pagination={pagination} />

      <br />
      <Stack spacing={10}>
        <TablePagination
          count={data.nodes.length}
          page={pagination.state.page}
          rowsPerPage={pagination.state.size}
          rowsPerPageOptions={[1, 2, 5]}
          onRowsPerPageChange={(event) =>
            pagination.fns.onSetSize(parseInt(event.target.value, 10))
          }
          onPageChange={(event, page) => pagination.fns.onSetPage(page)}
        />
      </Stack>

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
import { usePagination } from '@table-library/react-table-library/pagination';
import { Stack, TablePagination } from '@mui/material';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Pagination';

const Component = () => {
  const data = { nodes };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 2,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

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
      <CompactTable columns={COLUMNS} data={data} theme={theme} pagination={pagination} />

      <br />
      <Stack spacing={10}>
        <TablePagination
          count={data.nodes.length}
          page={pagination.state.page}
          rowsPerPage={pagination.state.size}
          rowsPerPageOptions={[1, 2, 5]}
          onRowsPerPageChange={(event) =>
            pagination.fns.onSetSize(parseInt(event.target.value, 10))
          }
          onPageChange={(event, page) => pagination.fns.onSetPage(page)}
        />
      </Stack>

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
