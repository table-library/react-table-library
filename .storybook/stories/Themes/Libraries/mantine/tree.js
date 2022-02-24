import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import {
  DEFAULT_OPTIONS,
  getMantineTheme,
} from '@table-library/react-table-library/themes/mantine';
import { useTree } from '@table-library/react-table-library/tree';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Tree';

const Component = () => {
  const data = { nodes };

  const mantineTheme = getMantineTheme(DEFAULT_OPTIONS);
  const theme = useTheme(mantineTheme);

  const tree = useTree(
    data,
    {
      onChange: onTreeChange,
    },
    {
      treeIcon: {
        margin: '4px',
        iconDefault: null,
        iconRight: <FaChevronRight />,
        iconDown: <FaChevronDown />,
      },
    },
  );

  function onTreeChange(action, state) {
    console.log(action, state);
  }

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, tree: true },
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
      <CompactTable columns={COLUMNS} data={data} theme={theme} tree={tree} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTree } from '@table-library/react-table-library/tree';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Select';

const Component = () => {
  const data = { nodes };

  const tree = useTree(data, {
    onChange: onTreeChange,
  });

  function onTreeChange(action, state) {
    console.log(action, state);
  }

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, tree: true },
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
      <CompactTable columns={COLUMNS} data={data} tree={tree} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
