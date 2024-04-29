import * as React from 'react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@overmap-ai/react-table-library/chakra-ui';
import { Box, Button } from '@chakra-ui/react';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Column Ordering';

const Component = () => {
  const data = { nodes };

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

  const [columns, setColumns] = React.useState([
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
  ]);

  const handleOrder = () => {
    setColumns([...columns].sort(() => 0.5 - Math.random()));
  };

  return (
    <>
      <Button colorScheme="teal" onClick={handleOrder}>
        Shuffle
      </Button>
      <br />

      <Box p={3} borderWidth="1px" borderRadius="lg">
        <CompactTable columns={columns} data={data} theme={theme} />
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
import { Box, Button } from '@chakra-ui/react';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Column Ordering';

const Component = () => {
  const data = { nodes };

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

  const [columns, setColumns] = React.useState([
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
  ]);

  const handleOrder = () => {
    setColumns([...columns].sort(() => 0.5 - Math.random()));
  };

  return (
    <>
      <Button colorScheme="teal" onClick={handleOrder}>
        Shuffle
      </Button>
      <br />

      <Box p={3} borderWidth="1px" borderRadius="lg">
        <CompactTable columns={columns} data={data} theme={theme} />
      </Box>

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
