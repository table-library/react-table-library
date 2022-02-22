/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { CompactTable } from '@table-library/react-table-library/compact';

import { nodes } from '../data';

storiesOf('Compact/Column Hiding', module)
  .addParameters({ component: CompactTable })
  .add('column hiding', () => {
    const data = { nodes };

    const [hiddenColumns, setHiddenColumns] = React.useState(['DEADLINE', 'COMPLETE']);

    const toggleColumn = (column) => {
      if (hiddenColumns.includes(column)) {
        setHiddenColumns(hiddenColumns.filter((v) => v !== column));
      } else {
        setHiddenColumns(hiddenColumns.concat(column));
      }
    };

    const COLUMNS = [
      { label: 'Task', renderCell: (item) => item.name, hide: { hideKey: 'TASK' } },
      {
        label: 'Deadline',
        renderCell: (item) =>
          item.deadline.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
        hide: { hideKey: 'DEADLINE' },
      },
      { label: 'Type', renderCell: (item) => item.type, hide: { hideKey: 'TYPE' } },
      {
        label: 'Complete',
        renderCell: (item) => item.isComplete.toString(),
        hide: { hideKey: 'COMPLETE' },
      },
      { label: 'Tasks', renderCell: (item) => item.nodes?.length, hide: { hideKey: 'TASKS' } },
    ];

    return (
      <>
        <div>
          <label htmlFor="name">
            <input
              id="name"
              type="checkbox"
              value="NAME"
              checked={!hiddenColumns.includes('NAME')}
              onChange={() => toggleColumn('NAME')}
            />
            Name
          </label>
        </div>

        <div>
          <label htmlFor="deadline">
            <input
              id="deadline"
              type="checkbox"
              value="DEADLINE"
              checked={!hiddenColumns.includes('DEADLINE')}
              onChange={() => toggleColumn('DEADLINE')}
            />
            Deadline
          </label>
        </div>

        <div>
          <label htmlFor="type">
            <input
              id="type"
              type="checkbox"
              value="TYPE"
              checked={!hiddenColumns.includes('TYPE')}
              onChange={() => toggleColumn('TYPE')}
            />
            Type
          </label>
        </div>

        <div>
          <label htmlFor="complete">
            <input
              id="complete"
              type="checkbox"
              value="COMPLETE"
              checked={!hiddenColumns.includes('COMPLETE')}
              onChange={() => toggleColumn('COMPLETE')}
            />
            Complete
          </label>
        </div>

        <div>
          <label htmlFor="tasks">
            <input
              id="tasks"
              type="checkbox"
              value="TASKS"
              checked={!hiddenColumns.includes('TASKS')}
              onChange={() => toggleColumn('TASKS')}
            />
            Tasks
          </label>
        </div>

        <CompactTable columns={COLUMNS} data={data} layout={{ hiddenColumns }} />

        <br />
        <small style={{ width: '100%' }}>
          For more configuration, see <strong>Features/Column Hiding</strong> ...
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
