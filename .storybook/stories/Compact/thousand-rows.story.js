/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { CompactTable } from '@table-library/react-table-library/compact';

import { manyNodes } from '../data';

storiesOf('Compact/Ten Thousand Rows', module)
  .addParameters({ component: CompactTable })
  .add('large list', () => {
    const data = { nodes: manyNodes };

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
      rowHeight: (_item, _index) => 27,
    };

    return (
      <>
        <div style={{ height: '300px' }}>
          <CompactTable columns={COLUMNS} virtualizedOptions={VIRTUALIZED_OPTIONS} data={data} />
        </div>

        <br />
        <small style={{ width: '100%' }}>
          For more configuration, see <strong>Features/Thousand Rows</strong> ...
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
