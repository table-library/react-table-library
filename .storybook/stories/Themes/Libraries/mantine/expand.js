import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import {
  DEFAULT_OPTIONS,
  getMantineTheme,
} from '@table-library/react-table-library/themes/mantine';
import { Collapse } from '@mantine/core';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Expand';

const Component = () => {
  const data = { nodes };

  const mantineTheme = getMantineTheme(DEFAULT_OPTIONS);
  const theme = useTheme(mantineTheme);

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
      <Collapse in={ids.includes(item.id)}>
        <ul
          style={{
            margin: '0',
            padding: '0',
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
      </Collapse>
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
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import {
  DEFAULT_OPTIONS,
  getMantineTheme,
} from '@table-library/react-table-library/themes/mantine';
import { Collapse } from '@mantine/core';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Expand';

const Component = () => {
  const data = { nodes };

  const mantineTheme = getMantineTheme(DEFAULT_OPTIONS);
  const theme = useTheme(mantineTheme);

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
      <Collapse in={ids.includes(item.id)}>
        <ul
          style={{
            margin: '0',
            padding: '0',
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
      </Collapse>
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
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
