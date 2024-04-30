import * as React from 'react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { getTheme } from '@overmap-ai/react-table-library/baseline';

import { DocumentationSee } from '../documentation';
import { nodes } from '../data';

const Component = () => {
  let data = { nodes };

  const theme = useTheme(getTheme());

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

      <CompactTable columns={COLUMNS} data={data} theme={theme} />

      <br />
      <DocumentationSee anchor={'Features/Filter'} />
    </>
  );
};

export default Component;
