/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { usePagination } from '@table-library/react-table-library/pagination';

import { nodes } from '../data';

storiesOf('Compact/Pagination', module)
  .addParameters({ component: CompactTable })
  .add('pagination', () => {
    const data = { nodes };

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
        <CompactTable columns={COLUMNS} data={data} pagination={pagination} />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>

          <span>
            Page:{' '}
            {pagination.state.getPages(data.nodes).map((_, index) => (
              <button
                key={index}
                type="button"
                style={{
                  fontWeight: pagination.state.page === index ? 'bold' : 'normal',
                }}
                onClick={() => pagination.fns.onSetPage(index)}
              >
                {index + 1}
              </button>
            ))}
          </span>
        </div>

        <br />
        <small style={{ width: '100%' }}>
          For more configuration, see <strong>Features/Pagination</strong> ...
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
