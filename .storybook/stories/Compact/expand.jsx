import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

import { DocumentationSee } from '../documentation';
import { nodes } from '../data';

const Component = () => {
  const data = { nodes };

  const theme = useTheme(getTheme());

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
          <tr style={{ display: 'flex', gridColumn: '1 / -1' }}>
            <td style={{ flex: '1' }}>
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
            </td>
          </tr>
        )}
      </>
    ),
  };

  return (
    <>
      <CompactTable
        columns={COLUMNS}
        rowProps={ROW_PROPS}
        rowOptions={ROW_OPTIONS}
        data={data}
        theme={theme}
      />

      <br />
      <DocumentationSee anchor={'Features/Expand'} />
    </>
  );
};

export default Component;
