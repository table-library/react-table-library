import * as React from 'react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@overmap-ai/react-table-library/chakra-ui';
import { usePagination } from '@overmap-ai/react-table-library/pagination';
import { Box, HStack, Button, IconButton } from '@chakra-ui/react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Pagination';

const Component = () => {
  const data = { nodes };

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

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
      <Box p={3} borderWidth="1px" borderRadius="lg">
        <CompactTable columns={COLUMNS} data={data} theme={theme} pagination={pagination} />
      </Box>

      <br />
      <HStack justify="flex-end">
        <IconButton
          aria-label="previous page"
          icon={<FaChevronLeft />}
          colorScheme="teal"
          variant="ghost"
          disabled={pagination.state.page === 0}
          onClick={() => pagination.fns.onSetPage(pagination.state.page - 1)}
        />

        {pagination.state.getPages(data.nodes).map((_, index) => (
          <Button
            key={index}
            colorScheme="teal"
            variant={pagination.state.page === index ? 'solid' : 'ghost'}
            onClick={() => pagination.fns.onSetPage(index)}
          >
            {index + 1}
          </Button>
        ))}
        <IconButton
          aria-label="next page"
          icon={<FaChevronRight />}
          colorScheme="teal"
          variant="ghost"
          disabled={pagination.state.page + 1 === pagination.state.getTotalPages(data.nodes)}
          onClick={() => pagination.fns.onSetPage(pagination.state.page + 1)}
        />
      </HStack>

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
import { usePagination } from '@overmap-ai/react-table-library/pagination';
import { Box, HStack, Button, IconButton } from '@chakra-ui/react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Pagination';

const Component = () => {
  const data = { nodes };

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

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
      <Box p={3} borderWidth="1px" borderRadius="lg">
        <CompactTable columns={COLUMNS} data={data} theme={theme} pagination={pagination} />
      </Box>

      <br />
      <HStack justify="flex-end">
        <IconButton
          aria-label="previous page"
          icon={<FaChevronLeft />}
          colorScheme="teal"
          variant="ghost"
          disabled={pagination.state.page === 0}
          onClick={() => pagination.fns.onSetPage(pagination.state.page - 1)}
        />

        {pagination.state.getPages(data.nodes).map((_, index) => (
          <Button
            key={index}
            colorScheme="teal"
            variant={pagination.state.page === index ? 'solid' : 'ghost'}
            onClick={() => pagination.fns.onSetPage(index)}
          >
            {index + 1}
          </Button>
        ))}
        <IconButton
          aria-label="next page"
          icon={<FaChevronRight />}
          colorScheme="teal"
          variant="ghost"
          disabled={pagination.state.page + 1 === pagination.state.getTotalPages(data.nodes)}
          onClick={() => pagination.fns.onSetPage(pagination.state.page + 1)}
        />
      </HStack>

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
