/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { CompactTable } from '@table-library/react-table-library/compact';

import { nodes } from '../data';

storiesOf('Compact/Expand', module)
  .addParameters({ component: CompactTable })
  .add('expand', () => {
    const data = { nodes };

    const [ids, setIds] = React.useState([]);

    const handleExpand = (item) => {
      if (ids.includes(item.id)) {
        setIds(ids.filter((id) => id !== item.id));
      } else {
        setIds(ids.concat(item.id));
      }
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

    const ROW_PROPS = {
      onClick: handleExpand,
    };

    const ROW_OPTIONS = {
      renderAfterRow: (item) => (
        <>
          {ids.includes(item.id) && (
            <ul
              style={{
                margin: '0',
                padding: '0',
                backgroundColor: '#e0e0e0',
              }}
            >
              <li>
                <strong>Name:</strong> {item.name.toUpperCase()}
              </li>
              <li>
                <strong>Deadline:</strong> {item.deadline.toLocaleDateString('en-US')}
              </li>
              <li>
                <strong>Type:</strong> {item.type}
              </li>
              <li>
                <strong>Complete:</strong> {item.isComplete.toString()}
              </li>
            </ul>
          )}
        </>
      ),
    };

    return (
      <>
        <CompactTable columns={COLUMNS} rowProps={ROW_PROPS} rowOptions={ROW_OPTIONS} data={data} />

        <br />
        <small style={{ width: '100%' }}>
          For more configuration, see <strong>Features/Tree</strong> ...
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
