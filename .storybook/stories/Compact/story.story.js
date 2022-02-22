/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useSort } from '@table-library/react-table-library/sort';

import { nodes } from '../data';

storiesOf('Compact/Sort', module)
  .addParameters({ component: CompactTable })
  .add('sort', () => {
    const data = { nodes };

    const sort = useSort(
      data,
      {
        onChange: onSortChange,
      },
      {
        sortFns: {
          TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
          DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
          TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
          COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
          TASKS: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
        },
      },
    );

    function onSortChange(action, state) {
      console.log(action, state);
    }

    const COLUMNS = [
      { label: 'Task', renderCell: (item) => item.name, sort: { sortKey: 'TASK' } },
      {
        label: 'Deadline',
        renderCell: (item) =>
          item.deadline.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
        sort: { sortKey: 'DEADLINE' },
      },
      { label: 'Type', renderCell: (item) => item.type, sort: { sortKey: 'TYPE' } },
      {
        label: 'Complete',
        renderCell: (item) => item.isComplete.toString(),
        sort: { sortKey: 'COMPLETE' },
      },
      { label: 'Tasks', renderCell: (item) => item.nodes?.length, sort: { sortKey: 'TASKS' } },
    ];

    return (
      <>
        <CompactTable columns={COLUMNS} data={data} sort={sort} />

        <br />
        <small style={{ width: '100%' }}>
          For more configuration, see <strong>Features/Sort</strong> ...
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
