import * as React from 'react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@overmap-ai/react-table-library/chakra-ui';
import { Box } from '@chakra-ui/react';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Native Configuration';

const Component = () => {
  const data = { nodes };

  const [horizontalSpacing, setHorizontalSpacing] = React.useState(
    DEFAULT_OPTIONS.horizontalSpacing,
  );
  const [verticalSpacing, setVerticalSpacing] = React.useState(DEFAULT_OPTIONS.verticalSpacing);
  const [striped, setStriped] = React.useState(DEFAULT_OPTIONS.striped);
  const [hasFooter, setFooter] = React.useState(false);
  const [caption, setCaption] = React.useState('');

  const mantineTheme = getTheme({
    horizontalSpacing,
    verticalSpacing,
    striped,
  });
  const theme = useTheme(mantineTheme);

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, footer: hasFooter ? 'Task' : null },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      footer: hasFooter ? 'Deadline' : null,
    },
    { label: 'Type', renderCell: (item) => item.type, footer: hasFooter ? 'Type' : null },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
      footer: hasFooter ? 'Complete' : null,
    },
    {
      label: 'Tasks',
      renderCell: (item) => item.nodes?.length,
      footer: hasFooter ? 'Tasks' : null,
    },
  ];

  const TABLE_OPTIONS = {
    renderAfterTable: () => (
      <>
        {caption && (
          <div className="caption-container">
            <caption>{caption}</caption>
          </div>
        )}
      </>
    ),
  };

  return (
    <>
      <label>
        horizontalSpacing:
        <input
          type="range"
          min="18"
          max="30"
          value={horizontalSpacing}
          onChange={(event) => setHorizontalSpacing(event.target.value)}
        />
      </label>
      <label>
        verticalSpacing:
        <input
          type="range"
          min="6"
          max="18"
          value={verticalSpacing}
          onChange={(event) => setVerticalSpacing(event.target.value)}
        />
      </label>
      <label>
        striped:
        <input type="checkbox" checked={striped} onChange={() => setStriped(!striped)} />
      </label>
      <label>
        has footer:
        <input type="checkbox" checked={hasFooter} onChange={() => setFooter(!hasFooter)} />
      </label>
      <label>
        caption:
        <input type="text" value={caption} onChange={(event) => setCaption(event.target.value)} />
      </label>
      <br />

      <Box p={3} borderWidth="1px" borderRadius="lg">
        <CompactTable columns={COLUMNS} tableOptions={TABLE_OPTIONS} data={data} theme={theme} />
      </Box>

      <br />
      <DocumentationSee noLink anchor={"Chakra UI's official documentation"} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@overmap-ai/react-table-library/chakra-ui';
import { Box } from '@chakra-ui/react';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Native Configuration';

const Component = () => {
  const data = { nodes };

  const [horizontalSpacing, setHorizontalSpacing] = React.useState(
    DEFAULT_OPTIONS.horizontalSpacing,
  );
  const [verticalSpacing, setVerticalSpacing] = React.useState(DEFAULT_OPTIONS.verticalSpacing);
  const [striped, setStriped] = React.useState(DEFAULT_OPTIONS.striped);
  const [hasFooter, setFooter] = React.useState(false);
  const [caption, setCaption] = React.useState('');

  const mantineTheme = getTheme({
    horizontalSpacing,
    verticalSpacing,
    striped,
  });
  const theme = useTheme(mantineTheme);

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name, footer: hasFooter ? 'Task' : null },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      footer: hasFooter ? 'Deadline' : null,
    },
    { label: 'Type', renderCell: (item) => item.type, footer: hasFooter ? 'Type' : null },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
      footer: hasFooter ? 'Complete' : null,
    },
    {
      label: 'Tasks',
      renderCell: (item) => item.nodes?.length,
      footer: hasFooter ? 'Tasks' : null,
    },
  ];

  const TABLE_OPTIONS = {
    renderAfterTable: () => (
      <>
        {caption && (
          <div className="caption-container">
            <caption>{caption}</caption>
          </div>
        )}
      </>
    ),
  };

  return (
    <>
      <label>
        horizontalSpacing:
        <input
          type="range"
          min="18"
          max="30"
          value={horizontalSpacing}
          onChange={(event) => setHorizontalSpacing(event.target.value)}
        />
      </label>
      <label>
        verticalSpacing:
        <input
          type="range"
          min="6"
          max="18"
          value={verticalSpacing}
          onChange={(event) => setVerticalSpacing(event.target.value)}
        />
      </label>
      <label>
        striped:
        <input type="checkbox" checked={striped} onChange={() => setStriped(!striped)} />
      </label>
      <label>
        has footer:
        <input type="checkbox" checked={hasFooter} onChange={() => setFooter(!hasFooter)} />
      </label>
      <label>
        caption:
        <input type="text" value={caption} onChange={(event) => setCaption(event.target.value)} />
      </label>
      <br />

      <Box p={3} borderWidth="1px" borderRadius="lg">
        <CompactTable columns={COLUMNS} tableOptions={TABLE_OPTIONS} data={data} theme={theme} />
      </Box>

      <br />
      <DocumentationSee noLink anchor={"Chakra UI's official documentation"} />
    </>
  );
};
`;

export { key, Component, code };
