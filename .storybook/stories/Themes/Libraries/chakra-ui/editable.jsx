import * as React from 'react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@overmap-ai/react-table-library/chakra-ui';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Editable';

const Component = () => {
  const [data, setData] = React.useState({ nodes });

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

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

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
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@overmap-ai/react-table-library/chakra';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Editable';

const Component = () => {
  const [data, setData] = React.useState({ nodes });

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

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

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
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
