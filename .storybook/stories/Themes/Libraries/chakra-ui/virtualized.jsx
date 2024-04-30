import * as React from 'react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@overmap-ai/react-table-library/chakra-ui';
import { Box } from '@chakra-ui/react';

import { DocumentationSee } from '../../../documentation';
import { manyNodes } from '../../../data';

const key = 'Virtualized';

const Component = () => {
  const data = { nodes: manyNodes };

  const chakraTheme = getTheme(DEFAULT_OPTIONS, { isVirtualized: true });
  const theme = useTheme(chakraTheme);

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

  const VIRTUALIZED_OPTIONS = {
    rowHeight: (_item, _index) => 49,
  };

  return (
    <>
      <Box p={3} borderWidth="1px" borderRadius="lg" style={{ height: '300px' }}>
        <CompactTable
          columns={COLUMNS}
          virtualizedOptions={VIRTUALIZED_OPTIONS}
          data={data}
          theme={theme}
          layout={{ isDiv: true, fixedHeader: true }}
        />
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
import { manyNodes } from '../../../data';

const key = 'Virtualized';

const Component = () => {
  const data = { nodes: manyNodes };

  const chakraTheme = getTheme(DEFAULT_OPTIONS, { isVirtualized: true });
  const theme = useTheme(chakraTheme);

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

  const VIRTUALIZED_OPTIONS = {
    rowHeight: (_item, _index) => 49,
  };

  return (
    <>
      <Box p={3} borderWidth="1px" borderRadius="lg" style={{ height: '300px' }}>
        <CompactTable
          columns={COLUMNS}
          virtualizedOptions={VIRTUALIZED_OPTIONS}
          data={data}
          theme={theme}
          layout={{ isDiv: true, fixedHeader: true }}
        />
      </Box>

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
