import * as React from 'react';

import { useCustom } from '@table-library/react-table-library/table';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/themes/mantine';
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
  Group,
  TextInput,
  Checkbox,
  Modal,
  ActionIcon,
  Button,
  Drawer,
  Space,
  Pagination,
} from '@mantine/core';
import { FaPen, FaSearch, FaChevronRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { nodes } from '../../../data';

const key = 'Showreel';

const Component = () => {
  const [data, setData] = React.useState({ nodes });

  //* Theme *//

  const mantineTheme = getTheme({
    ...DEFAULT_OPTIONS,
    striped: true,
    highlightOnHover: true,
  });
  const customTheme = {
    Table: `
      margin: 16px 0px;
    `,
  };
  const theme = useTheme([mantineTheme, customTheme]);

  //* Resize *//

  const resize = { resizerHighlight: '#dee2e6' };

  //* Pagination *//

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 4,
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
            checked={select.state.all}
            indeterminate={!select.state.all && !select.state.none}
            onChange={select.fns.onToggleAll}
          />
        ),
        renderCellSelect: (item) => (
          <Checkbox
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
          <ActionIcon
            variant="filled"
            color="blue"
            component="button"
            onClick={() => setDrawerId(item.id)}
          >
            <FaPen />
          </ActionIcon>
        </div>
      ),
      resize,
      sort: { sortKey: 'TASKS' },
    },
  ];

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Not all features included here, but we got ..."
      >
        <div>
          <Checkbox label="Resize" checked />
        </div>
        <div>
          <Checkbox label="Sort" checked />
        </div>
        <div>
          <Checkbox label="Search" checked />
        </div>
        <div>
          <Checkbox label="Filter" checked />
        </div>
        <div>
          <Checkbox label="Select" checked />
        </div>
        <div>
          <Checkbox label="Tree" checked />
        </div>
        <div>
          <Checkbox label="Drawer" checked />
        </div>
        <div>
          <Checkbox label="Pagination" checked />
        </div>
      </Modal>

      {/* Form */}

      <Group mx={10}>
        <Button onClick={() => setModalOpened(true)}>Features?</Button>

        <TextInput
          placeholder="Search Task"
          value={search}
          icon={<FaSearch />}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Checkbox
          label="Hide Complete"
          checked={isHide}
          onChange={(event) => setHide(event.target.checked)}
        />
      </Group>

      {/* Table */}

      <CompactTable
        columns={COLUMNS}
        data={{ ...data, nodes: modifiedNodes }}
        theme={theme}
        select={select}
        tree={tree}
        sort={sort}
        pagination={pagination}
      />

      <Group position="right" mx={10}>
        <Pagination
          total={pagination.state.getTotalPages(modifiedNodes)}
          page={pagination.state.page + 1}
          onChange={(page) => pagination.fns.onSetPage(page - 1)}
        />
      </Group>

      <Drawer
        opened={drawerId}
        onClose={handleCancel}
        title="Edit"
        padding="xl"
        size="xl"
        position="right"
      >
        <Group grow>
          <TextInput
            label="Name"
            value={edited || fromTreeToList(data.nodes).find((node) => node.id === drawerId)?.name}
            onChange={handleEdit}
            data-autofocus
          />
        </Group>
        <Space h="md" />
        <Group grow>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </Group>
      </Drawer>
    </>
  );
};

const code = `
import * as React from 'react';

import { useCustom } from '@table-library/react-table-library/table';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/themes/mantine';
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
  Group,
  TextInput,
  Checkbox,
  Modal,
  ActionIcon,
  Button,
  Drawer,
  Space,
  Pagination,
} from '@mantine/core';
import {
  FaPen,
  FaSearch,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

import { nodes } from '../../../data';

const key = 'Showreel';

const Component = () => {
  const [data, setData] = React.useState({ nodes });

  //* Theme *//

  const mantineTheme = getTheme({
    ...DEFAULT_OPTIONS,
    striped: true,
    highlightOnHover: true,
  });
  const customTheme = {
    Table: \`
      margin: 16px 0px;
    \`,
  };
  const theme = useTheme([mantineTheme, customTheme]);

  //* Resize *//

  const resize = { resizerHighlight: '#dee2e6' };

  //* Pagination *//

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 4,
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
            checked={select.state.all}
            indeterminate={!select.state.all && !select.state.none}
            onChange={select.fns.onToggleAll}
          />
        ),
        renderCellSelect: (item) => (
          <Checkbox
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
          <ActionIcon
            variant="filled"
            color="blue"
            component="button"
            onClick={() => setDrawerId(item.id)}
          >
            <FaPen />
          </ActionIcon>
        </div>
      ),
      resize,
      sort: { sortKey: 'TASKS' },
    },
  ];

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Not all features included here, but we got ..."
      >
        <div>
          <Checkbox label="Resize" checked />
        </div>
        <div>
          <Checkbox label="Sort" checked />
        </div>
        <div>
          <Checkbox label="Search" checked />
        </div>
        <div>
          <Checkbox label="Filter" checked />
        </div>
        <div>
          <Checkbox label="Select" checked />
        </div>
        <div>
          <Checkbox label="Tree" checked />
        </div>
        <div>
          <Checkbox label="Drawer" checked />
        </div>
        <div>
          <Checkbox label="Pagination" checked />
        </div>
      </Modal>

      {/* Form */}

      <Group mx={10}>
        <Button onClick={() => setModalOpened(true)}>Features?</Button>

        <TextInput
          placeholder="Search Task"
          value={search}
          icon={<FaSearch />}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Checkbox
          label="Hide Complete"
          checked={isHide}
          onChange={(event) => setHide(event.target.checked)}
        />
      </Group>

      {/* Table */}

      <CompactTable
        columns={COLUMNS}
        data={{ ...data, nodes: modifiedNodes }}
        theme={theme}
        select={select}
        tree={tree}
        sort={sort}
        pagination={pagination}
      />

      <Group position="right" mx={10}>
        <Pagination
          total={pagination.state.getTotalPages(modifiedNodes)}
          page={pagination.state.page + 1}
          onChange={(page) => pagination.fns.onSetPage(page - 1)}
        />
      </Group>

      <Drawer
        opened={drawerId}
        onClose={handleCancel}
        title="Edit"
        padding="xl"
        size="xl"
        position="right"
      >
        <Group grow>
          <TextInput
            label="Name"
            value={edited || fromTreeToList(data.nodes).find((node) => node.id === drawerId)?.name}
            onChange={handleEdit}
            data-autofocus
          />
        </Group>
        <Space h="md" />
        <Group grow>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </Group>
      </Drawer>
    </>
  );
};
`;

export { key, Component, code };
