/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';

import { nodes } from '../data';

storiesOf('Compact/Layout', module)
  .addParameters({ component: CompactTable })
  .add('layout', () => {
    const data = { nodes };

    const theme = useTheme({
      BaseCell: `
        &:nth-child(1) {
          min-width: 35%;
          width: 35%;
        }

        &:nth-child(2), &:nth-child(3), &:nth-child(4) {
          min-width: 15%;
          width: 15%;
        }

        &:nth-child(5) {
          min-width: 20%;
          width: 20%;
        }
      `,
    });

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
        <CompactTable columns={COLUMNS} data={data} theme={theme} layout={{ custom: true }} />

        <br />
        <small style={{ width: '100%' }}>
          For more configuration, see <strong>Features/Layout</strong> ...
        </small>
      </>
    );
  })
  .add('documentation', () => (
    <ul>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
    </ul>
  ));
