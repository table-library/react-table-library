/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell
} from '@table-library/react-table-library/lib/table';

import { HeaderCellSort } from '@table-library/react-table-library/lib/sort';
import { useTableState } from '@table-library/react-table-library/lib/hooks';

import { getList } from '../server/list';

storiesOf('06. Server Recipes/ 03. Origin Mixed/Multi', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const [search, setSearch] = React.useState('');

    const handleSearch = event => {
      setSearch(event.target.value);
    };

    const [list, setList] = React.useState([]);

    // initial fetching

    const doGetList = React.useCallback(async params => {
      setList(await getList(params));
    }, []);

    React.useEffect(() => {
      doGetList({});
    }, [doGetList]);

    // server-side search and sort

    const handleTableStateChange = useTableState(
      (type, tableState, thirdPartyState) => {
        const SERVER_SIDE_OPERATIONS = ['SEARCH', 'SORT'];

        if (SERVER_SIDE_OPERATIONS.includes(type)) {
          const params = {
            search: thirdPartyState.search,
            sortKey: tableState.sort.sortState.key,
            sortReverse: tableState.sort.sortState.reverse
          };

          doGetList(params);
        }
      },
      // thirdPartyState
      {
        SEARCH: {
          stateKey: 'search',
          stateValue: search
        }
      }
    );

    return (
      <>
        <label htmlFor="search">
          Search by name:
          <input id="search" type="text" onChange={handleSearch} />
        </label>

        <Table
          list={list}
          server={{
            search: true,
            sort: true
          }}
          onTableStateChange={handleTableStateChange}
        >
          {tableList => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCellSort
                    sortKey="name"
                    sortFn={array =>
                      array.sort((a, b) =>
                        a.name.localeCompare(b.name)
                      )
                    }
                  >
                    Name
                  </HeaderCellSort>
                  <HeaderCellSort
                    sortKey="stars"
                    sortFn={array =>
                      array.sort((a, b) => a.stars - b.stars)
                    }
                  >
                    Stars
                  </HeaderCellSort>
                  <HeaderCellSort
                    sortKey="light"
                    sortFn={array =>
                      array.sort((a, b) => a.light - b.light)
                    }
                  >
                    Light
                  </HeaderCellSort>
                  <HeaderCellSort
                    sortKey="count"
                    sortFn={array =>
                      array.sort((a, b) => a.count - b.count)
                    }
                  >
                    Count
                  </HeaderCellSort>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map(item => (
                  <Row key={item.id} item={item}>
                    {tableItem => (
                      <React.Fragment key={tableItem.id}>
                        <Cell>{tableItem.name}</Cell>
                        <Cell>{tableItem.stars}</Cell>
                        <Cell>{tableItem.light.toString()}</Cell>
                        <Cell>{tableItem.count}</Cell>
                      </React.Fragment>
                    )}
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </>
    );
  })
  .add('with one debounced operation', () => {
    const [search, setSearch] = React.useState('');

    const handleSearch = event => {
      setSearch(event.target.value);
    };

    const [list, setList] = React.useState([]);

    // initial fetching

    const doGetList = React.useCallback(async params => {
      setList(await getList(params));
    }, []);

    React.useEffect(() => {
      doGetList({});
    }, [doGetList]);

    // server-side search and sort

    const timeout = React.useRef();

    const handleTableStateChange = useTableState(
      (type, tableState, thirdPartyState) => {
        const SERVER_SIDE_OPERATIONS = ['SORT'];
        const SERVER_SIDE_OPERATIONS_DEBOUNCED = ['SEARCH'];

        const params = {
          search: thirdPartyState.search,
          sortKey: tableState.sort.sortState.key,
          sortReverse: tableState.sort.sortState.reverse
        };

        if (SERVER_SIDE_OPERATIONS.includes(type)) {
          doGetList(params);
        }

        if (SERVER_SIDE_OPERATIONS_DEBOUNCED.includes(type)) {
          if (timeout.current) clearTimeout(timeout.current);

          timeout.current = setTimeout(() => doGetList(params), 1500);
        }
      },
      // thirdPartyState
      {
        SEARCH: {
          stateKey: 'search',
          stateValue: search
        }
      }
    );

    return (
      <>
        <label htmlFor="search">
          Search by name:
          <input id="search" type="text" onChange={handleSearch} />
        </label>

        <Table
          list={list}
          server={{
            search: true,
            sort: true
          }}
          onTableStateChange={handleTableStateChange}
        >
          {tableList => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCellSort
                    sortKey="name"
                    sortFn={array =>
                      array.sort((a, b) =>
                        a.name.localeCompare(b.name)
                      )
                    }
                  >
                    Name
                  </HeaderCellSort>
                  <HeaderCellSort
                    sortKey="stars"
                    sortFn={array =>
                      array.sort((a, b) => a.stars - b.stars)
                    }
                  >
                    Stars
                  </HeaderCellSort>
                  <HeaderCellSort
                    sortKey="light"
                    sortFn={array =>
                      array.sort((a, b) => a.light - b.light)
                    }
                  >
                    Light
                  </HeaderCellSort>
                  <HeaderCellSort
                    sortKey="count"
                    sortFn={array =>
                      array.sort((a, b) => a.count - b.count)
                    }
                  >
                    Count
                  </HeaderCellSort>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map(item => (
                  <Row key={item.id} item={item}>
                    {tableItem => (
                      <React.Fragment key={tableItem.id}>
                        <Cell>{tableItem.name}</Cell>
                        <Cell>{tableItem.stars}</Cell>
                        <Cell>{tableItem.light.toString()}</Cell>
                        <Cell>{tableItem.count}</Cell>
                      </React.Fragment>
                    )}
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </>
    );
  });
