/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';

import { nodes } from '../data';

storiesOf('Compact/Pin', module)
  .addParameters({ component: CompactTable })
  .add('pin', () => {
    const data = { nodes };

    const theme = useTheme({
      BaseCell: `
        &:nth-child(1) {
          left: 0px;

          min-width: 250px;
          width: 250px;
        }

        &:nth-child(2) {
          left: 250px;

          min-width: 150px;
          width: 150px;
        }

        &:nth-child(3) {
          min-width: 20%;
          width: 20%;
        }

        &:nth-child(4), &:nth-child(5) {
          min-width: 700px;
          width: 700px;
        }
      `,
    });

    const COLUMNS = [
      { label: 'Task', renderCell: (item) => item.name, pin: true },
      {
        label: 'Deadline',
        renderCell: (item) =>
          item.deadline.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
        pin: true,
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
        <small style={{ width: '100%' }}>
          For more configuration, see <strong>Features/Pin</strong> ...
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
