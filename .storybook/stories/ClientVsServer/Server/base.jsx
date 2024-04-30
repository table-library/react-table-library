import * as React from 'react';
import axios from 'axios';

import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
  useCustom,
} from '@overmap-ai/react-table-library/table';
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { CellSelect, HeaderCellSelect, useRowSelect } from '@overmap-ai/react-table-library/select';
import { usePagination } from '@overmap-ai/react-table-library/pagination';

const Component = () => {
  const theme = useTheme({
    Table: `
        --data-table-library_grid-template-columns:  24px repeat(4, minmax(0, 1fr));
      `,
  });

  const BASE_URL = 'https://hn.algolia.com/api/v1/search';

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
      nodes: result.data.hits.map((hit) => ({ ...hit, id: hit.objectID })),
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
    },
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
      500,
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
        Search by Task:&nbsp;
        <input id="search" type="text" value={search} onChange={handleSearch} />
      </label>

      <label htmlFor="filter">
        <input id="filter" type="checkbox" checked={filter} onChange={handleFilter} />
        Only "Ask HN"
      </label>

      <Table
        data={data}
        theme={theme}
        layout={{ custom: true }}
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
                    {new Date(item.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
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
                  fontWeight: pagination.state.page === index ? 'bold' : 'normal',
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
};

export default Component;
