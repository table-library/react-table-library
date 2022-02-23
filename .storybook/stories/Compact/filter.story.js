/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { CompactTable } from '@table-library/react-table-library/compact';

import { nodes } from '../data';

storiesOf('Compact', module)
  .addParameters({ component: CompactTable })
  .add('Filter', () => {
    const [filters, setFilters] = React.useState(['SETUP', 'LEARN']);

    const handleFilter = (filter) => {
      filters.includes(filter)
        ? setFilters(filters.filter((value) => value !== filter))
        : setFilters(filters.concat(filter));
    };

    const data = {
      nodes: nodes.filter(
        (item) =>
          (filters.includes('SETUP') && item.type === 'SETUP') ||
          (filters.includes('LEARN') && item.type === 'LEARN'),
      ),
    };

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
        <div>
          <label htmlFor="setup">
            Include SETUP:
            <input
              id="setup"
              type="checkbox"
              checked={filters.includes('SETUP')}
              onChange={() => handleFilter('SETUP')}
            />
          </label>
        </div>

        <div>
          <label htmlFor="learn">
            Include LEARN:
            <input
              id="learn"
              type="checkbox"
              checked={filters.includes('LEARN')}
              onChange={() => handleFilter('LEARN')}
            />
          </label>
        </div>

        <CompactTable columns={COLUMNS} data={data} />

        <br />
        <small style={{ width: '100%' }}>
          For more configuration, see <strong>Features/Filter</strong> ...
        </small>
      </>
    );
  });
