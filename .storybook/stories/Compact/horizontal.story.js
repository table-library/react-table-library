/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';

import { nodes } from '../data';

storiesOf('Compact/Horizontal Scroll', module)
  .addParameters({ component: CompactTable })
  .add('horizontal scroll', () => {
    const data = { nodes };

    const theme = useTheme({
      BaseCell: `
        &:nth-child(1) {
          min-width: 50%;
          width: 50%;
        }

        &:nth-child(2) {
          min-width: 200px;
          width: 200px;
        }

        &:nth-child(3), &:nth-child(4) {
          min-width: 25%;
          width: 25%;
        }

        &:nth-child(5) {
          min-width: 50%;
          width: 50%;
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
        <CompactTable
          columns={COLUMNS}
          data={data}
          theme={theme}
          layout={{ custom: true, horizontalScroll: true }}
        />

        <br />
        <small style={{ width: '100%' }}>
          For more configuration, see <strong>Features/Horizontal Scroll</strong> ...
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
