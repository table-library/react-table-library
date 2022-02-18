/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
  useCustom,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import { useRowSelect } from '@table-library/react-table-library/select';
import { CellTree, useTree, TreeExpandClickTypes } from '@table-library/react-table-library/tree';
import { useSort, HeaderCellSort } from '@table-library/react-table-library/sort';
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
  Button,
  Drawer,
  Space,
  Pagination,
} from '@mantine/core';
import {
  FaSearch,
  FaRegCheckSquare,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

import { nodes } from '../../data';

const DEFAULT_OPTIONS = {
  horizontalSpacing: 10,
  verticalSpacing: 10,
  striped: false,
  highlightOnHover: false,
};

const getTheme = ({ horizontalSpacing, verticalSpacing, striped, highlightOnHover }) => ({
  Table: `
    padding: 16px;
    font-size: 14px;

    .caption-container {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      width: 100%;
    }

    caption {
      color: #868e96;
    }
  `,
  HeaderRow: `
    &.tr-footer {
      border-bottom: 1px solid transparent;
    }
  `,
  BaseRow: `
    border-bottom: 1px solid #dee2e6;
  `,
  Row: `
    &:nth-child(odd) {
      background-color: ${striped ? '#f8f9fa' : '#ffffff'};
    }

    &:nth-child(even) {
      background-color: #ffffff;
    }

    ${
      highlightOnHover
        ? `
            &:hover {
              background-color: #f1f3f5;
            }
          `
        : ``
    }
  `,
  BaseCell: `
    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;

    padding: ${verticalSpacing}px ${horizontalSpacing}px;

    & > div {
      padding: 0;
    }
  `,
  HeaderCell: `
    font-weight: bold;
    color: #495057;
  `,
  Cell: `
    color: #000000;
  `,
});

const getMantineTheme = (options) => {
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...(options ? options : {}),
  };

  return getTheme(mergedOptions);
};

storiesOf('Library Themes/Mantine', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const data = { nodes };

    const mantineTheme = getMantineTheme(DEFAULT_OPTIONS);
    const theme = useTheme(mantineTheme);

    return (
      <Table data={data} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Task</HeaderCell>
                <HeaderCell>Deadline</HeaderCell>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Complete</HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row item={item} key={item.id}>
                  <Cell>{item.name}</Cell>
                  <Cell>
                    {item.deadline.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Cell>
                  <Cell>{item.type}</Cell>
                  <Cell>{item.isComplete.toString()}</Cell>
                  <Cell>{item.nodes?.length}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('configure', () => {
    const data = { nodes };

    const [horizontalSpacing, setHorizontalSpacing] = React.useState(
      DEFAULT_OPTIONS.horizontalSpacing,
    );
    const [verticalSpacing, setVerticalSpacing] = React.useState(DEFAULT_OPTIONS.verticalSpacing);
    const [striped, setStriped] = React.useState(DEFAULT_OPTIONS.striped);
    const [highlightOnHover, setHighlightOnHover] = React.useState(
      DEFAULT_OPTIONS.highlightOnHover,
    );
    const [hasFooter, setFooter] = React.useState(false);
    const [caption, setCaption] = React.useState('');

    const mantineTheme = getMantineTheme({
      horizontalSpacing,
      verticalSpacing,
      striped,
      highlightOnHover,
    });
    const theme = useTheme(mantineTheme);

    return (
      <>
        <label>
          horizontalSpacing:
          <input
            type="range"
            min="10"
            max="24"
            value={horizontalSpacing}
            onChange={(event) => setHorizontalSpacing(event.target.value)}
          />
        </label>
        <label>
          verticalSpacing:
          <input
            type="range"
            min="10"
            max="24"
            value={verticalSpacing}
            onChange={(event) => setVerticalSpacing(event.target.value)}
          />
        </label>
        <label>
          striped:
          <input type="checkbox" checked={striped} onChange={() => setStriped(!striped)} />
        </label>
        <label>
          highlightOnHover:
          <input
            type="checkbox"
            checked={highlightOnHover}
            onChange={() => setHighlightOnHover(!striped)}
          />
        </label>
        <label>
          has footer:
          <input type="checkbox" checked={hasFooter} onChange={() => setFooter(!hasFooter)} />
        </label>
        <label>
          caption:
          <input type="text" value={caption} onChange={() => setCaption(event.target.value)} />
        </label>

        <hr />
        <Table data={data} theme={theme}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>Task</HeaderCell>
                  <HeaderCell>Deadline</HeaderCell>
                  <HeaderCell>Type</HeaderCell>
                  <HeaderCell>Complete</HeaderCell>
                  <HeaderCell>Tasks</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row item={item} key={item.id}>
                    <Cell>{item.name}</Cell>
                    <Cell>
                      {item.deadline.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </Cell>
                    <Cell>{item.type}</Cell>
                    <Cell>{item.isComplete.toString()}</Cell>
                    <Cell>{item.nodes?.length}</Cell>
                  </Row>
                ))}
              </Body>

              {hasFooter && (
                <Header>
                  <HeaderRow className="tr-footer">
                    <HeaderCell>Task</HeaderCell>
                    <HeaderCell>Deadline</HeaderCell>
                    <HeaderCell>Type</HeaderCell>
                    <HeaderCell>Complete</HeaderCell>
                    <HeaderCell>Tasks</HeaderCell>
                  </HeaderRow>
                </Header>
              )}

              {caption && (
                <div className="caption-container">
                  <caption>{caption}</caption>
                </div>
              )}
            </>
          )}
        </Table>
      </>
    );
  })
  .add('batteries included', () => {
    const [data, setData] = React.useState({ nodes });

    //* Theme *//

    const mantineTheme = getMantineTheme({
      ...DEFAULT_OPTIONS,
      striped: true,
      highlightOnHover: true,
    });
    const customTheme = {
      Table: `
        padding: 16px 0px;
      `,
      Row: `
        &.row-select-single-selected, &.row-select-selected {
          background-color: #b3dcff;
          border-bottom: 1px solid #b3dcff;
        }
      `,
      Cell: `
        & .match {
            font-weight: bold;
            color: #212121;
          }
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

    const highlight = (needle, haystack) =>
      haystack.replace(new RegExp(needle, 'gi'), (str) => `<span class="match">${str}</span>`);

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
        state: {
          sortKey: 'TASK',
          reverse: true,
        },
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

    return (
      <div style={{ padding: '16px 16px 0' }}>
        <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Features!">
          <div>
            <FaRegCheckSquare /> Resize
          </div>
          <div>
            <FaRegCheckSquare /> Sort
          </div>
          <div>
            <FaRegCheckSquare /> Search
          </div>
          <div>
            <FaRegCheckSquare /> Filter
          </div>
          <div>
            <FaRegCheckSquare /> Select
          </div>
          <div>
            <FaRegCheckSquare /> Tree
          </div>
          <div>
            <FaRegCheckSquare /> Drawer on Double Click
          </div>
          <div>
            <FaRegCheckSquare /> Pagination
          </div>
          <div>
            <FaRegCheckSquare /> WIP pin
          </div>
          <div>
            <FaRegCheckSquare /> WIP column hide
          </div>
          <div>
            <FaRegCheckSquare /> WIP column order
          </div>
        </Modal>

        {/* Form */}

        <Group>
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

        <Table
          data={{ ...data, nodes: modifiedNodes }}
          theme={theme}
          select={select}
          tree={tree}
          sort={sort}
          pagination={pagination}
        >
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell stiff>
                    <Checkbox
                      checked={select.state.all}
                      indeterminate={!select.state.all && !select.state.none}
                      onChange={select.fns.onToggleAll}
                    />
                  </HeaderCell>
                  <HeaderCellSort resize={resize} sortKey="TASK">
                    Task
                  </HeaderCellSort>
                  <HeaderCellSort resize={resize} sortKey="DEADLINE">
                    Deadline
                  </HeaderCellSort>
                  <HeaderCellSort resize={resize} sortKey="TYPE">
                    Type
                  </HeaderCellSort>
                  <HeaderCellSort resize={resize} sortKey="COMPLETE">
                    Complete
                  </HeaderCellSort>
                  <HeaderCellSort resize={resize} sortKey="TASKS">
                    Tasks
                  </HeaderCellSort>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row item={item} key={item.id} onDoubleClick={() => setDrawerId(item.id)}>
                    <Cell stiff>
                      <Checkbox
                        checked={select.state.ids.includes(item.id)}
                        onChange={() => select.fns.onToggleById(item.id)}
                      />
                    </Cell>
                    <CellTree item={item}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlight(search, item.name),
                        }}
                      />
                    </CellTree>
                    <Cell>
                      {item.deadline.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </Cell>
                    <Cell>{item.type}</Cell>
                    <Cell>{item.isComplete.toString()}</Cell>
                    <Cell>{item.nodes?.length}</Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>

        <Group position="right">
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
              value={
                edited || fromTreeToList(data.nodes).find((node) => node.id === drawerId)?.name
              }
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
      </div>
    );
  })
  .add('documentation', () => (
    <ul>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
      <li>
        <a href="https://mantine.dev/">Mantine</a>
      </li>
    </ul>
  ));
