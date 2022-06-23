import * as React from 'react';

import { useCustom } from '@table-library/react-table-library/table';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { useRowSelect } from '@table-library/react-table-library/select';
import { useTree, TreeExpandClickTypes } from '@table-library/react-table-library/tree';
import { useSort } from '@table-library/react-table-library/sort';
import { usePagination } from '@table-library/react-table-library/pagination';
import {
  fromTreeToList,
  findNodeById,
  insertNode,
} from '@table-library/react-table-library/common';
import {
  Stack,
  TextField,
  Checkbox,
  Modal,
  IconButton,
  Button,
  Box,
  Typography,
  Drawer,
  FormGroup,
  FormControlLabel,
  TablePagination,
} from '@mui/material';
import { FaPen, FaChevronRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { nodes } from '../../../data';

const key = 'Showreel';

const Component = () => {
  const [data, setData] = React.useState({ nodes });

  //* Theme *//

  const materialTheme = getTheme({
    ...DEFAULT_OPTIONS,
    striped: true,
    highlightOnHover: true,
  });
  const customTheme = {
    Table: `
      --data-table-library_grid-template-columns:  70px repeat(5, minmax(0, 1fr));

      margin: 16px 0px;
    `,
  };
  const theme = useTheme([materialTheme, customTheme]);

  //* Resize *//

  const resize = { resizerHighlight: '#dee2e6' };

  //* Pagination *//

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 2,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

  //* Search *//

  const [search, setSearch] = React.useState('');

  useCustom('search', data, {
    state: { search },
    onChange: onSearchChange,
  });

  function onSearchChange(action, state) {
    console.log(action, state);
    pagination.fns.onSetPage(0);
  }

  //* Filter *//

  const [isHide, setHide] = React.useState(false);

  useCustom('filter', data, {
    state: { isHide },
    onChange: onFilterChange,
  });

  function onFilterChange(action, state) {
    console.log(action, state);
    pagination.fns.onSetPage(0);
  }

  //* Select *//

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onSelectChange(action, state) {
    console.log(action, state);
  }

  //* Tree *//

  const tree = useTree(
    data,
    {
      onChange: onTreeChange,
    },
    {
      clickType: TreeExpandClickTypes.ButtonClick,
      treeYLevel: 1,
      treeIcon: {
        margin: '4px',
        iconDefault: null,
        iconRight: <FaChevronRight />,
        iconDown: <FaChevronDown />,
      },
    },
  );

  function onTreeChange(action, state) {
    console.log(action, state);
  }

  //* Sort *//

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconDefault: null,
        iconUp: <FaChevronUp />,
        iconDown: <FaChevronDown />,
      },
      sortFns: {
        TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
        TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
        TASKS: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    },
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  //* Drawer *//

  const [drawerId, setDrawerId] = React.useState(null);
  const [edited, setEdited] = React.useState('');

  const handleEdit = (event) => {
    setEdited(event.target.value);
  };

  const handleCancel = () => {
    setEdited('');
    setDrawerId(null);
  };

  const handleSave = () => {
    const node = findNodeById(data.nodes, drawerId);
    const editedNode = { ...node, name: edited };
    const nodes = insertNode(data.nodes, editedNode);

    setData({
      nodes,
    });

    setEdited('');
    setDrawerId(null);
  };

  //* Modal *//

  const [modalOpened, setModalOpened] = React.useState(false);

  //* Custom Modifiers *//

  let modifiedNodes = data.nodes;

  // search
  modifiedNodes = modifiedNodes.filter((node) =>
    node.name.toLowerCase().includes(search.toLowerCase()),
  );

  // filter
  modifiedNodes = isHide ? modifiedNodes.filter((node) => !node.isComplete) : modifiedNodes;

  //* Columns *//

  const COLUMNS = [
    {
      label: 'Task',
      renderCell: (item) => item.name,
      resize,
      sort: { sortKey: 'TASK' },
      select: {
        renderHeaderCellSelect: () => (
          <Checkbox
            size="small"
            checked={select.state.all}
            indeterminate={!select.state.all && !select.state.none}
            onChange={select.fns.onToggleAll}
          />
        ),
        renderCellSelect: (item) => (
          <Checkbox
            size="small"
            checked={select.state.ids.includes(item.id)}
            onChange={() => select.fns.onToggleById(item.id)}
          />
        ),
      },
      tree: true,
    },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      resize,
      sort: { sortKey: 'DEADLINE' },
    },
    { label: 'Type', renderCell: (item) => item.type, resize, sort: { sortKey: 'TYPE' } },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
      resize,
      sort: { sortKey: 'COMPLETE' },
    },
    {
      label: 'Tasks',
      renderCell: (item) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{item.nodes?.length}</span>
          <IconButton onClick={() => setDrawerId(item.id)}>
            <FaPen size={14} />
          </IconButton>
        </div>
      ),
      resize,
      sort: { sortKey: 'TASKS' },
    },
  ];

  return (
    <>
      <Modal open={modalOpened} onClose={() => setModalOpened(false)}>
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            padding: '10px',
          }}
        >
          <Typography variant="h6" component="h2">
            "Not all features included here, but we got ..."
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked />} label="Resize" />
            <FormControlLabel control={<Checkbox checked />} label="Sort" />
            <FormControlLabel control={<Checkbox checked />} label="Search" />
            <FormControlLabel control={<Checkbox checked />} label="Filter" />
            <FormControlLabel control={<Checkbox checked />} label="Select" />
            <FormControlLabel control={<Checkbox checked />} label="Tree" />
            <FormControlLabel control={<Checkbox checked />} label="Drawer on Edit" />
            <FormControlLabel control={<Checkbox checked />} label="Pagination" />
          </FormGroup>
        </Box>
      </Modal>

      {/* Form */}

      <Stack spacing={1} direction="row">
        <Button variant="contained" onClick={() => setModalOpened(true)}>
          Features?
        </Button>

        <TextField
          label="Search Task"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox checked={isHide} onChange={(event) => setHide(event.target.checked)} />
          }
          label="Hide Complete"
        />
      </Stack>

      {/* Table */}

      <CompactTable
        columns={COLUMNS}
        data={{ ...data, nodes: modifiedNodes }}
        theme={theme}
        layout={{ custom: true }}
        select={select}
        tree={tree}
        sort={sort}
        pagination={pagination}
      />

      <br />
      <Stack spacing={10}>
        <TablePagination
          count={modifiedNodes.length}
          page={pagination.state.page}
          rowsPerPage={pagination.state.size}
          rowsPerPageOptions={[1, 2, 5]}
          onRowsPerPageChange={(event) =>
            pagination.fns.onSetSize(parseInt(event.target.value, 10))
          }
          onPageChange={(event, page) => pagination.fns.onSetPage(page)}
        />
      </Stack>

      <Drawer
        open={drawerId}
        onClose={handleCancel}
        title="Edit"
        anchor="right"
        PaperProps={{
          sx: { width: '50%', padding: '20px' },
        }}
      >
        <Stack spacing={1}>
          <TextField
            label="Name"
            value={edited || fromTreeToList(data.nodes).find((node) => node.id === drawerId)?.name}
            onChange={handleEdit}
            autoFocus
          />
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Stack>
      </Drawer>
    </>
  );
};

const code = `
import * as React from 'react';

import { useCustom } from '@table-library/react-table-library/table';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { useRowSelect } from '@table-library/react-table-library/select';
import { useTree, TreeExpandClickTypes } from '@table-library/react-table-library/tree';
import { useSort } from '@table-library/react-table-library/sort';
import { usePagination } from '@table-library/react-table-library/pagination';
import {
  fromTreeToList,
  findNodeById,
  insertNode,
} from '@table-library/react-table-library/common';
import {
  Stack,
  TextField,
  Checkbox,
  Modal,
  IconButton,
  Button,
  Box,
  Typography,
  Drawer,
  FormGroup,
  FormControlLabel,
  TablePagination,
} from '@mui/material';
import { FaPen, FaChevronRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { nodes } from '../../../data';

const key = 'Showreel';

const Component = () => {
  const [data, setData] = React.useState({ nodes });

  //* Theme *//

  const materialTheme = getTheme({
    ...DEFAULT_OPTIONS,
    striped: true,
    highlightOnHover: true,
  });
  const customTheme = {
    Table: \`
      --data-table-library_grid-template-columns:  70px repeat(5, minmax(0, 1fr));

      margin: 16px 0px;
    \`,
  };
  const theme = useTheme([materialTheme, customTheme]);

  //* Resize *//

  const resize = { resizerHighlight: '#dee2e6' };

  //* Pagination *//

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 2,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

  //* Search *//

  const [search, setSearch] = React.useState('');

  useCustom('search', data, {
    state: { search },
    onChange: onSearchChange,
  });

  function onSearchChange(action, state) {
    console.log(action, state);
    pagination.fns.onSetPage(0);
  }

  //* Filter *//

  const [isHide, setHide] = React.useState(false);

  useCustom('filter', data, {
    state: { isHide },
    onChange: onFilterChange,
  });

  function onFilterChange(action, state) {
    console.log(action, state);
    pagination.fns.onSetPage(0);
  }

  //* Select *//

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onSelectChange(action, state) {
    console.log(action, state);
  }

  //* Tree *//

  const tree = useTree(
    data,
    {
      onChange: onTreeChange,
    },
    {
      clickType: TreeExpandClickTypes.ButtonClick,
      treeYLevel: 1,
      treeIcon: {
        margin: '4px',
        iconDefault: null,
        iconRight: <FaChevronRight />,
        iconDown: <FaChevronDown />,
      },
    },
  );

  function onTreeChange(action, state) {
    console.log(action, state);
  }

  //* Sort *//

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconDefault: null,
        iconUp: <FaChevronUp />,
        iconDown: <FaChevronDown />,
      },
      sortFns: {
        TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
        TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
        TASKS: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    },
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  //* Drawer *//

  const [drawerId, setDrawerId] = React.useState(null);
  const [edited, setEdited] = React.useState('');

  const handleEdit = (event) => {
    setEdited(event.target.value);
  };

  const handleCancel = () => {
    setEdited('');
    setDrawerId(null);
  };

  const handleSave = () => {
    const node = findNodeById(data.nodes, drawerId);
    const editedNode = { ...node, name: edited };
    const nodes = insertNode(data.nodes, editedNode);

    setData({
      nodes,
    });

    setEdited('');
    setDrawerId(null);
  };

  //* Modal *//

  const [modalOpened, setModalOpened] = React.useState(false);

  //* Custom Modifiers *//

  let modifiedNodes = data.nodes;

  // search
  modifiedNodes = modifiedNodes.filter((node) =>
    node.name.toLowerCase().includes(search.toLowerCase()),
  );

  // filter
  modifiedNodes = isHide ? modifiedNodes.filter((node) => !node.isComplete) : modifiedNodes;

  //* Columns *//

  const COLUMNS = [
    {
      label: 'Task',
      renderCell: (item) => item.name,
      resize,
      sort: { sortKey: 'TASK' },
      select: {
        renderHeaderCellSelect: () => (
          <Checkbox
            size="small"
            checked={select.state.all}
            indeterminate={!select.state.all && !select.state.none}
            onChange={select.fns.onToggleAll}
          />
        ),
        renderCellSelect: (item) => (
          <Checkbox
            size="small"
            checked={select.state.ids.includes(item.id)}
            onChange={() => select.fns.onToggleById(item.id)}
          />
        ),
      },
      tree: true,
    },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      resize,
      sort: { sortKey: 'DEADLINE' },
    },
    { label: 'Type', renderCell: (item) => item.type, resize, sort: { sortKey: 'TYPE' } },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
      resize,
      sort: { sortKey: 'COMPLETE' },
    },
    {
      label: 'Tasks',
      renderCell: (item) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{item.nodes?.length}</span>
          <IconButton onClick={() => setDrawerId(item.id)}>
            <FaPen size={14} />
          </IconButton>
        </div>
      ),
      resize,
      sort: { sortKey: 'TASKS' },
    },
  ];

  return (
    <>
      <Modal open={modalOpened} onClose={() => setModalOpened(false)}>
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            padding: '10px',
          }}
        >
          <Typography variant="h6" component="h2">
            "Not all features included here, but we got ..."
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked />} label="Resize" />
            <FormControlLabel control={<Checkbox checked />} label="Sort" />
            <FormControlLabel control={<Checkbox checked />} label="Search" />
            <FormControlLabel control={<Checkbox checked />} label="Filter" />
            <FormControlLabel control={<Checkbox checked />} label="Select" />
            <FormControlLabel control={<Checkbox checked />} label="Tree" />
            <FormControlLabel control={<Checkbox checked />} label="Drawer on Edit" />
            <FormControlLabel control={<Checkbox checked />} label="Pagination" />
          </FormGroup>
        </Box>
      </Modal>

      {/* Form */}

      <Stack spacing={1} direction="row">
        <Button variant="contained" onClick={() => setModalOpened(true)}>
          Features?
        </Button>

        <TextField
          label="Search Task"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox checked={isHide} onChange={(event) => setHide(event.target.checked)} />
          }
          label="Hide Complete"
        />
      </Stack>

      {/* Table */}

      <CompactTable
        columns={COLUMNS}
        data={{ ...data, nodes: modifiedNodes }}
        theme={theme}
        layout={{ custom: true }}
        select={select}
        tree={tree}
        sort={sort}
        pagination={pagination}
      />

      <br />
      <Stack spacing={10}>
        <TablePagination
          count={modifiedNodes.length}
          page={pagination.state.page}
          rowsPerPage={pagination.state.size}
          rowsPerPageOptions={[1, 2, 5]}
          onRowsPerPageChange={(event) =>
            pagination.fns.onSetSize(parseInt(event.target.value, 10))
          }
          onPageChange={(event, page) => pagination.fns.onSetPage(page)}
        />
      </Stack>

      <Drawer
        open={drawerId}
        onClose={handleCancel}
        title="Edit"
        anchor="right"
        PaperProps={{
          sx: { width: '50%', padding: '20px' },
        }}
      >
        <Stack spacing={1}>
          <TextField
            label="Name"
            value={edited || fromTreeToList(data.nodes).find((node) => node.id === drawerId)?.name}
            onChange={handleEdit}
            autoFocus
          />
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Stack>
      </Drawer>
    </>
  );
};
`;

export { key, Component, code };
