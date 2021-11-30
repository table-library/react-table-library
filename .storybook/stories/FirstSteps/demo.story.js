/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import axios from 'axios';
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
import {
  CellTree,
  useTree,
  TREE_EXPAND_CLICK_TYPES,
} from '@table-library/react-table-library/tree';
import {
  CellSelect,
  HeaderCellSelect,
  useRowSelect,
} from '@table-library/react-table-library/select';
import {
  useSort,
  HeaderCellSort,
} from '@table-library/react-table-library/sort';
import { usePagination } from '@table-library/react-table-library/pagination';

import { nodes } from '../data';

storiesOf('First Steps/Demo', module)
  .addParameters({ component: Table })
  .add('Client-Side', () => {
    const data = {
      nodes,
    };

    const theme = useTheme({
      Table: `
        border-radius: 4px;
        border: 1px solid #e0e0e0;
      `,
      BaseRow: `
        height: 52px;
        font-size: 14px;

        border-bottom: 1px solid #e0e0e0;
      `,
      HeaderRow: `
        font-weight: bold;
      `,
      Row: `
        &:hover {
          background-color: #f5f5f5;
        }

        &.row-select-selected, &.row-select-single-selected {
          background-color: #edf4fb;

          &:hover {
            background-color: #e3eefa;
          }
        }
      `,
      HeaderCell: `
        border-right: 1px solid transparent;

        &:not(:first-child) {
          border-right: 1px dotted #e0e0e0;
        }
      `,
      Cell: `
        border-right: 1px solid transparent;
      `,
    });

    const tree = useTree(
      data,
      {
        onChange: onTreeChange,
      },
      {
        clickType: TREE_EXPAND_CLICK_TYPES.ButtonClick,
        treeYLevel: 1,
      }
    );

    const select = useRowSelect(data, {
      onChange: onSelectChange,
    });

    const sort = useSort(
      data,
      {
        onChange: onSortChange,
      },
      {
        sortFns: {
          TASK: (array) =>
            array.sort((a, b) => a.name.localeCompare(b.name)),
          DEADLINE: (array) =>
            array.sort((a, b) => a.deadline - b.deadline),
          TYPE: (array) =>
            array.sort((a, b) => a.type.localeCompare(b.type)),
          COMPLETE: (array) =>
            array.sort((a, b) => a.isComplete - b.isComplete),
          TASKS: (array) =>
            array.sort(
              (a, b) =>
                (a.nodes || []).length - (b.nodes || []).length
            ),
        },
      }
    );

    const pagination = usePagination(data, {
      state: {
        page: 0,
        size: 5,
      },
      onChange: onPaginationChange,
    });

    function onTreeChange(action, state) {
      console.log(action, state);
    }

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    function onSortChange(action, state) {
      console.log(action, state);
    }

    function onPaginationChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table
        data={data}
        theme={theme}
        tree={tree}
        select={select}
        sort={sort}
        pagination={pagination}
        layout={{ boxOffset: 2 }}
      >
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
                <HeaderCellSort resize sortKey="TASK">
                  Task
                </HeaderCellSort>
                <HeaderCellSort resize sortKey="DEADLINE">
                  Deadline
                </HeaderCellSort>
                <HeaderCellSort resize sortKey="TYPE">
                  Type
                </HeaderCellSort>
                <HeaderCellSort resize sortKey="COMPLETE">
                  Complete
                </HeaderCellSort>
                <HeaderCellSort resize sortKey="TASKS">
                  Tasks
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <CellSelect item={item} />
                  <CellTree item={item}>{item.name}</CellTree>
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

            <div
              style={{
                fontSize: '14px',
                padding: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>
                Total Pages:{' '}
                {pagination.state.getTotalPages(data.nodes)}
              </span>

              <span>
                Page:{' '}
                {pagination.state
                  .getPages(data.nodes)
                  .map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      style={{
                        fontWeight:
                          pagination.state.page === index
                            ? 'bold'
                            : 'normal',
                      }}
                      onClick={() => pagination.fns.onSetPage(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
              </span>
            </div>
          </>
        )}
      </Table>
    );
  })
  .add('Server-Side', () => {
    const theme = useTheme({
      Table: `
        border-radius: 4px;
        border: 1px solid #e0e0e0;
      `,
      BaseRow: `
        height: 52px;
        font-size: 14px;

        border-bottom: 1px solid #e0e0e0;
      `,
      HeaderRow: `
        font-weight: bold;
      `,
      Row: `
        &:hover {
          background-color: #f5f5f5;
        }

        &.row-select-selected, &.row-select-single-selected {
          background-color: #edf4fb;

          &:hover {
            background-color: #e3eefa;
          }
        }
      `,
      HeaderCell: `
        border-right: 1px solid transparent;

        &:not(:first-child) {
          border-right: 1px dotted #e0e0e0;
        }
      `,
      Cell: `
        border-right: 1px solid transparent;
      `,
    });

    const BASE_URL = 'http://hn.algolia.com/api/v1/search';

    const INITIAL_PARAMS = {
      search: 'react',
      filter: false,
      page: 0,
    };

    const [data, setData] = React.useState({
      nodes: [],
      totalPages: 0,
    });

    const fetchData = React.useCallback(async (params) => {
      let url = `${BASE_URL}?query=${params.search}&page=${params.page}`;

      if (params.filter) {
        url = `${url}&tags=ask_hn`;
      }

      const result = await axios.get(url);

      setData({
        nodes: result.data.hits,
        totalPages: result.data.nbPages,
      });
    }, []);

    React.useEffect(() => {
      fetchData({
        search: INITIAL_PARAMS.search,
        filter: INITIAL_PARAMS.filter,
        page: INITIAL_PARAMS.page,
      });
    }, [fetchData]);

    // client-side select

    const select = useRowSelect(data, {
      onChange: onSelectChange,
    });

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    // server-side search

    const [search, setSearch] = React.useState(INITIAL_PARAMS.search);

    const handleSearch = (event) => {
      setSearch(event.target.value);
    };

    useCustom('search', data, {
      state: { search },
      onChange: onSearchChange,
    });

    // server-side filter

    const [filter, setFilter] = React.useState(INITIAL_PARAMS.filter);

    const handleFilter = (event) => {
      setFilter(event.target.checked);
    };

    useCustom('filter', data, {
      state: { filter },
      onChange: onFilterChange,
    });

    // server-side pagination

    const pagination = usePagination(
      data,
      {
        state: {
          page: INITIAL_PARAMS.page,
        },
        onChange: onPaginationChange,
      },
      {
        isServer: true,
      }
    );

    // listeners

    const timeout = React.useRef();
    function onSearchChange(action, state) {
      if (timeout.current) clearTimeout(timeout.current);

      timeout.current = setTimeout(
        () =>
          fetchData({
            search: state.search,
            filter,
            page: pagination.state.page,
          }),
        500
      );
    }

    function onFilterChange(action, state) {
      fetchData({
        search,
        filter: state.filter,
        page: pagination.state.page,
      });
    }

    function onPaginationChange(action, state) {
      fetchData({
        search,
        filter,
        page: state.page,
      });
    }

    return (
      <>
        <label htmlFor="search">
          Search by Task:
          <input
            id="search"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </label>

        <label htmlFor="filter">
          <input
            id="filter"
            type="checkbox"
            checked={filter}
            onChange={handleFilter}
          />
          Only "Ask HN"
        </label>

        <Table
          data={data}
          theme={theme}
          select={select}
          pagination={pagination}
        >
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCellSelect />
                  <HeaderCell>Title</HeaderCell>
                  <HeaderCell>Created At</HeaderCell>
                  <HeaderCell>Points</HeaderCell>
                  <HeaderCell>Comments</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <CellSelect item={item} />
                    <Cell>
                      <a href={item.url}>{item.title}</a>
                    </Cell>
                    <Cell>
                      {new Date(item.created_at).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        }
                      )}
                    </Cell>
                    <Cell>{item.points}</Cell>
                    <Cell>{item.num_comments}</Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>Total Pages: {data.totalPages}</span>

          <span>
            Page:{' '}
            {Array(data.totalPages)
              .fill()
              .map((_, index) => (
                <button
                  key={index}
                  type="button"
                  style={{
                    fontWeight:
                      pagination.state.page === index
                        ? 'bold'
                        : 'normal',
                  }}
                  onClick={() => pagination.fns.onSetPage(index)}
                >
                  {index + 1}
                </button>
              ))}
          </span>
        </div>
      </>
    );
  })
  .add('documentation', () => (
    <ul>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
    </ul>
  ));
