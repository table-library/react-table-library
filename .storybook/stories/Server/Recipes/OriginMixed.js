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
} from '@table-library/react-table-library/table';

import {
  useSort,
  HeaderCellSort,
} from '@table-library/react-table-library/sort';

import { getData } from '../../server';

storiesOf('Server Recipes/ 03. Origin Mixed', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const [data, setData] = React.useState({
      nodes: [],
    });

    // initial fetching

    const doGet = React.useCallback(async (params) => {
      setData(await getData(params));
    }, []);

    React.useEffect(() => {
      doGet({});
    }, [doGet]);

    // features: state

    const [search, setSearch] = React.useState('');

    const sort = useSort(
      {
        onChange: onSortChange,
      },
      {
        isServer: true,
      }
    );

    // features: handler

    const handleSearch = (event) => {
      setSearch(event.target.value);
    };

    React.useEffect(() => {
      const params = {
        search,
        sort: {
          sortKey: sort.state.sortKey,
          reverse: sort.state.reverse,
        },
      };

      doGet(params);
    }, [sort, search]);

    function onSortChange(action, state) {
      const params = {
        search,
        sort: {
          sortKey: state.sortKey,
          reverse: state.reverse,
        },
      };

      doGet(params);
    }

    return (
      <>
        <label htmlFor="search">
          Search by Task:
          <input id="search" type="text" onChange={handleSearch} />
        </label>

        <Table data={data} sort={sort}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCellSort sortKey="TASK">Task</HeaderCellSort>
                  <HeaderCellSort sortKey="DEADLINE">
                    Deadline
                  </HeaderCellSort>
                  <HeaderCellSort sortKey="TYPE">Type</HeaderCellSort>
                  <HeaderCellSort sortKey="COMPLETE">
                    Complete
                  </HeaderCellSort>
                  <HeaderCellSort sortKey="TASKS">
                    Tasks
                  </HeaderCellSort>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    {(tableItem) => (
                      <React.Fragment key={tableItem.id}>
                        <Cell>{tableItem.name}</Cell>
                        <Cell>
                          {tableItem.deadline.toLocaleDateString(
                            'fr-CA',
                            {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                            }
                          )}
                        </Cell>
                        <Cell>{tableItem.type}</Cell>
                        <Cell>{tableItem.isComplete.toString()}</Cell>
                        <Cell>{tableItem.nodes?.length}</Cell>
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
