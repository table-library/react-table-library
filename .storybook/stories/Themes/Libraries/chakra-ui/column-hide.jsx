import * as React from 'react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@overmap-ai/react-table-library/chakra-ui';
import { Box, HStack, Checkbox } from '@chakra-ui/react';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Column Hiding';

const Component = () => {
  const data = { nodes };

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

  const [hiddenColumns, setHiddenColumns] = React.useState(['DEADLINE', 'COMPLETE']);

  const toggleColumn = (column) => {
    if (hiddenColumns.includes(column)) {
      setHiddenColumns(hiddenColumns.filter((v) => v !== column));
    } else {
      setHiddenColumns(hiddenColumns.concat(column));
    }
  };

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, hide: hiddenColumns.includes('TASK') },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      hide: hiddenColumns.includes('DEADLINE'),
    },
    { label: 'Type', renderCell: (item) => item.type, hide: hiddenColumns.includes('TYPE') },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
      hide: hiddenColumns.includes('COMPLETE'),
    },
    {
      label: 'Tasks',
      renderCell: (item) => item.nodes?.length,
      hide: hiddenColumns.includes('TASKS'),
    },
  ];

  return (
    <>
      <HStack spacing={10}>
        <Checkbox
          colorScheme="teal"
          isChecked={!hiddenColumns.includes('NAME')}
          onChange={() => toggleColumn('NAME')}
        >
          Name
        </Checkbox>
        <Checkbox
          colorScheme="teal"
          isChecked={!hiddenColumns.includes('DEADLINE')}
          onChange={() => toggleColumn('DEADLINE')}
        >
          Deadline
        </Checkbox>
        <Checkbox
          colorScheme="teal"
          isChecked={!hiddenColumns.includes('TYPE')}
          onChange={() => toggleColumn('TYPE')}
        >
          Type
        </Checkbox>
        <Checkbox
          colorScheme="teal"
          isChecked={!hiddenColumns.includes('COMPLETE')}
          onChange={() => toggleColumn('COMPLETE')}
        >
          Complete
        </Checkbox>
        <Checkbox
          colorScheme="teal"
          isChecked={!hiddenColumns.includes('TASKS')}
          onChange={() => toggleColumn('TASKS')}
        >
          Tasks
        </Checkbox>
      </HStack>
      <br />

      <Box p={3} borderWidth="1px" borderRadius="lg">
        <CompactTable columns={COLUMNS} data={data} theme={theme} layout={{ hiddenColumns }} />
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
import { Box, HStack, Checkbox } from '@chakra-ui/react';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Column Hiding';

const Component = () => {
  const data = { nodes };

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

  const [hiddenColumns, setHiddenColumns] = React.useState(['DEADLINE', 'COMPLETE']);

  const toggleColumn = (column) => {
    if (hiddenColumns.includes(column)) {
      setHiddenColumns(hiddenColumns.filter((v) => v !== column));
    } else {
      setHiddenColumns(hiddenColumns.concat(column));
    }
  };

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, hide: hiddenColumns.includes('TASK') },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      hide: hiddenColumns.includes('DEADLINE'),
    },
    { label: 'Type', renderCell: (item) => item.type, hide: hiddenColumns.includes('TYPE') },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
      hide: hiddenColumns.includes('COMPLETE'),
    },
    {
      label: 'Tasks',
      renderCell: (item) => item.nodes?.length,
      hide: hiddenColumns.includes('TASKS'),
    },
  ];

  return (
    <>
      <HStack spacing={10}>
        <Checkbox
          colorScheme="teal"
          isChecked={!hiddenColumns.includes('NAME')}
          onChange={() => toggleColumn('NAME')}
        >
          Name
        </Checkbox>
        <Checkbox
          colorScheme="teal"
          isChecked={!hiddenColumns.includes('DEADLINE')}
          onChange={() => toggleColumn('DEADLINE')}
        >
          Deadline
        </Checkbox>
        <Checkbox
          colorScheme="teal"
          isChecked={!hiddenColumns.includes('TYPE')}
          onChange={() => toggleColumn('TYPE')}
        >
          Type
        </Checkbox>
        <Checkbox
          colorScheme="teal"
          isChecked={!hiddenColumns.includes('COMPLETE')}
          onChange={() => toggleColumn('COMPLETE')}
        >
          Complete
        </Checkbox>
        <Checkbox
          colorScheme="teal"
          isChecked={!hiddenColumns.includes('TASKS')}
          onChange={() => toggleColumn('TASKS')}
        >
          Tasks
        </Checkbox>
      </HStack>
      <br />

      <Box p={3} borderWidth="1px" borderRadius="lg">
        <CompactTable columns={COLUMNS} data={data} theme={theme} layout={{ hiddenColumns }} />
      </Box>

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
