import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import {
  DEFAULT_OPTIONS,
  getMantineTheme,
} from '@table-library/react-table-library/themes/mantine';
import { useSort } from '@table-library/react-table-library/sort';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Sort';

const Component = () => {
  const data = { nodes };

  const mantineTheme = getMantineTheme(DEFAULT_OPTIONS);
  const theme = useTheme(mantineTheme);

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconDefault: null,
        iconUp: <FaChevronUp />,
        iconDown: <FaChevronDown />,
      },
      sortFns: {
        TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
        TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
        TASKS: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    },
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, sort: { sortKey: 'TASK' } },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      sort: { sortKey: 'DEADLINE' },
    },
    { label: 'Type', renderCell: (item) => item.type, sort: { sortKey: 'TYPE' } },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
      sort: { sortKey: 'COMPLETE' },
    },
    { label: 'Tasks', renderCell: (item) => item.nodes?.length, sort: { sortKey: 'TASKS' } },
  ];

  return (
    <>
      <CompactTable columns={COLUMNS} data={data} sort={sort} theme={theme} />

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
import { useSort } from '@table-library/react-table-library/sort';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Sort';

const Component = () => {
  const data = { nodes };

  const mantineTheme = getMantineTheme(DEFAULT_OPTIONS);
  const theme = useTheme(mantineTheme);

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconDefault: null,
        iconUp: <FaChevronUp />,
        iconDown: <FaChevronDown />,
      },
      sortFns: {
        TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
        TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
        TASKS: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    },
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, sort: { sortKey: 'TASK' } },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      sort: { sortKey: 'DEADLINE' },
    },
    { label: 'Type', renderCell: (item) => item.type, sort: { sortKey: 'TYPE' } },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
      sort: { sortKey: 'COMPLETE' },
    },
    { label: 'Tasks', renderCell: (item) => item.nodes?.length, sort: { sortKey: 'TASKS' } },
  ];

  return (
    <>
      <CompactTable columns={COLUMNS} data={data} sort={sort} theme={theme} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
