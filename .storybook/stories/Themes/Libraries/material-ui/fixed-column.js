import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Fixed Column';

const Component = () => {
  const data = { nodes };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const customTheme = {
    BaseCell: `
      &:nth-of-type(1) {
        left: 0px;

        min-width: 250px;
        width: 250px;
      }

      &:nth-of-type(2) {
        left: 250px;

        min-width: 150px;
        width: 150px;
      }

      &:nth-of-type(3) {
        min-width: 20%;
        width: 20%;
      }

      &:nth-of-type(4), &:nth-of-type(5) {
        min-width: 700px;
        width: 700px;
      }
    `,
  };
  const theme = useTheme([materialTheme, customTheme]);

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
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        layout={{ custom: true, horizontalScroll: true }}
      />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Fixed Column';

const Component = () => {
  const data = { nodes };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const customTheme = {
    BaseCell: \`
      &:nth-of-type(1) {
        left: 0px;

        min-width: 250px;
        width: 250px;
      }

      &:nth-of-type(2) {
        left: 250px;

        min-width: 150px;
        width: 150px;
      }

      &:nth-of-type(3) {
        min-width: 20%;
        width: 20%;
      }

      &:nth-of-type(4), &:nth-of-type(5) {
        min-width: 700px;
        width: 700px;
      }
    \`,
  };
  const theme = useTheme([materialTheme, customTheme]);

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
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        layout={{ custom: true, horizontalScroll: true }}
      />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
