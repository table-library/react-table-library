import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

import { DocumentationSee } from '../documentation';
import { nodes } from '../data';

const Component = () => {
  const [data, setData] = React.useState({ nodes });

  const theme = useTheme(getTheme());

  const handleUpdate = (value, id, property) => {
    setData((state) => ({
      ...state,
      nodes: state.nodes.map((node) => {
        if (node.id === id) {
          return { ...node, [property]: value };
        } else {
          return node;
        }
      }),
    }));
  };

  const COLUMNS = [
    {
      label: 'Task',
      renderCell: (item) => (
        <input
          type="text"
          style={{ width: '100%', border: 'none', fontSize: '1rem', padding: 0, margin: 0 }}
          value={item.name}
          onChange={(event) => handleUpdate(event.target.value, item.id, 'name')}
        />
      ),
    },
    {
      label: 'Deadline',
      renderCell: (item) => (
        <input
          type="date"
          style={{ width: '100%', border: 'none', fontSize: '1rem', padding: 0, margin: 0 }}
          value={item.deadline.toISOString().substr(0, 10)}
          onChange={(event) => handleUpdate(new Date(event.target.value), item.id, 'deadline')}
        />
      ),
    },
    {
      label: 'Type',
      renderCell: (item) => (
        <select
          style={{ width: '100%', border: 'none', fontSize: '1rem', padding: 0, margin: 0 }}
          value={item.type}
          onChange={(event) => handleUpdate(event.target.value, item.id, 'type')}
        >
          <option value="SETUP">SETUP</option>
          <option value="LEARN">LEARN</option>
        </select>
      ),
    },
    {
      label: 'Complete',
      renderCell: (item) => (
        <input
          type="checkbox"
          checked={item.isComplete}
          onChange={(event) => handleUpdate(event.target.checked, item.id, 'isComplete')}
        />
      ),
    },
    {
      label: 'Tasks',
      renderCell: (item) => (
        <input
          type="number"
          style={{ width: '100%', border: 'none', fontSize: '1rem', padding: 0, margin: 0 }}
          value={typeof item.nodes === 'number' ? item.nodes : item.nodes?.length}
          onChange={(event) => handleUpdate(Number(event.target.value), item.id, 'nodes')}
        />
      ),
    },
  ];

  return (
    <>
      <CompactTable columns={COLUMNS} data={data} theme={theme} />

      <br />
      <DocumentationSee anchor={'Features/Editable'} />
    </>
  );
};

export default Component;
