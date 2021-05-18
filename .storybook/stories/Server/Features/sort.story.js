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

storiesOf('Server/Sort', module)
  .addParameters({ component: Table })
  .add('base', () => {
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

    // features

    const sort = useSort(
      data,
      {
        onChange: onSortChange,
      },
      {
        isServer: true,
      }
    );

    function onSortChange(action, state) {
      const params = {
        sort: {
          sortKey: state.sortKey,
          reverse: state.reverse,
        },
      };

      doGet(params);
    }

    return (
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
                <HeaderCellSort sortKey="TASKS">Tasks</HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  {(tableItem) => (
                    <>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'en-US',
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
                    </>
                  )}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });
