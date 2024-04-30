import * as React from 'react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@overmap-ai/react-table-library/chakra-ui';
import { Box } from '@chakra-ui/react';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Resize';

const Component = () => {
  const data = { nodes };

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, resize: true },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      resize: true,
    },
    { label: 'Type', renderCell: (item) => item.type, resize: true },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
      resize: true,
    },
    { label: 'Tasks', renderCell: (item) => item.nodes?.length, resize: true },
  ];

  return (
    <>
      <Box p={3} borderWidth="1px" borderRadius="lg">
        <CompactTable columns={COLUMNS} data={data} theme={theme} />
      </Box>

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@overmap-ai/react-table-library/chakra-ui';
import { Box } from '@chakra-ui/react';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Resize';

const Component = () => {
  const data = { nodes };

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, resize: true },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      resize: true,
    },
    { label: 'Type', renderCell: (item) => item.type, resize: true },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
      resize: true,
    },
    { label: 'Tasks', renderCell: (item) => item.nodes?.length, resize: true },
  ];

  return (
    <>
      <Box p={3} borderWidth="1px" borderRadius="lg">
        <CompactTable columns={COLUMNS} data={data} theme={theme} />
      </Box>

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
