import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/mantine';
import { Group, TextInput } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Search';

const Component = () => {
  let data = { nodes };

  const mantineTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(mantineTheme);

  const [search, setSearch] = React.useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  data = {
    nodes: data.nodes.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
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
      <Group mx={10}>
        <TextInput
          placeholder="Search Task"
          value={search}
          icon={<FaSearch />}
          onChange={handleSearch}
        />
      </Group>

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
import {
  DEFAULT_OPTIONS,
  getTheme,
} from '@table-library/react-table-library/mantine';
import { Group, TextInput } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Search';

const Component = () => {
  let data = { nodes };

  const mantineTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(mantineTheme);

  const [search, setSearch] = React.useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  data = {
    nodes: data.nodes.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
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
      <Group mx={10}>
        <TextInput
          placeholder="Search Task"
          value={search}
          icon={<FaSearch />}
          onChange={handleSearch}
        />
      </Group>

      <CompactTable columns={COLUMNS} data={data} theme={theme} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
