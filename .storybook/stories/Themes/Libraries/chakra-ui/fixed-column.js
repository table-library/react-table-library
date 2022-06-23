import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/chakra-ui';
import { Box } from '@chakra-ui/react';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Fixed Column';

const Component = () => {
  const data = { nodes };

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const customTheme = {
    Table: `
      grid-template-columns: 250px 150px 25% 25% 50%;
    `,
    BaseCell: `
      &:nth-of-type(1) {
        left: 0px;
      }

      &:nth-of-type(2) {
        left: 250px;
      }
    `,
  };
  const theme = useTheme([chakraTheme, customTheme]);

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, pinLeft: true },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      pinLeft: true,
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
        <CompactTable
          columns={COLUMNS}
          data={data}
          theme={theme}
          layout={{ custom: true, horizontalScroll: true }}
        />
      </Box>

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/chakra-ui';
import { Box } from '@chakra-ui/react';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Fixed Column';

const Component = () => {
  const data = { nodes };

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const customTheme = {
    Table: \`
      grid-template-columns: 250px 150px 25% 25% 50%;
    \`,
    BaseCell: \`
      &:nth-of-type(1) {
        left: 0px;
      }

      &:nth-of-type(2) {
        left: 250px;
      }
    \`,
  };
  const theme = useTheme([chakraTheme, customTheme]);

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, pinLeft: true },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      pinLeft: true,
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
        <CompactTable
          columns={COLUMNS}
          data={data}
          theme={theme}
          layout={{ custom: true, horizontalScroll: true }}
        />
      </Box>

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
