import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';

import { DocumentationSee } from '../documentation';
import { nodes } from '../data';

const key = 'Filter';

const Component = () => {
  let data = { nodes };

  const [isHide, setHide] = React.useState(false);

  data = {
    nodes: isHide ? data.nodes.filter((node) => !node.isComplete) : data.nodes,
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
        <label htmlFor="complete">
          Hide Complete:
          <input id="complete" type="checkbox" checked={isHide} onChange={() => setHide(!isHide)} />
        </label>
      </div>
      <br />

      <CompactTable columns={COLUMNS} data={data} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';

import { DocumentationSee } from '../documentation';
import { nodes } from '../data';

const key = 'Filter';

const Component = () => {
  let data = { nodes };

  const [isHide, setHide] = React.useState(false);

  data = {
    nodes: isHide ? data.nodes.filter((node) => !node.isComplete) : data.nodes,
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
        <label htmlFor="complete">
          Hide Complete:
          <input id="complete" type="checkbox" checked={isHide} onChange={() => setHide(!isHide)} />
        </label>
      </div>
      <br />

      <CompactTable columns={COLUMNS} data={data} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
