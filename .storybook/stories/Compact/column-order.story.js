/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { CompactTable } from '@table-library/react-table-library/compact';

import { nodes } from '../data';

storiesOf('Compact', module)
  .addParameters({ component: CompactTable })
  .add('Column Ordering', () => {
    const data = { nodes };

    const [columns, setColumns] = React.useState([
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
    ]);

    const handleOrder = () => {
      setColumns([...columns].sort(() => 0.5 - Math.random()));
    };

    return (
      <>
        <button type="button" onClick={handleOrder}>
          Shuffle
        </button>

        <CompactTable columns={columns} data={data} />

        <br />
        <small style={{ width: '100%' }}>
          For more configuration, see <strong>Features/Column Order</strong> ...
        </small>
      </>
    );
  });
