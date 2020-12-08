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
} from '@table';

import { HeaderCellSort } from '@sort';
import { useTableState } from '@hooks';

import { getList } from '../server/list';

storiesOf('05. Server/ 02. Sort', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const [list, setList] = React.useState([]);

    // initial fetching

    const doGetList = React.useCallback(async params => {
      setList(await getList(params));
    }, []);

    React.useEffect(() => {
      doGetList({});
    }, [doGetList]);

    // server-side sort

    const handleTableStateChange = useTableState(
      (type, tableState) => {
        const SERVER_SIDE_OPERATIONS = ['SORT'];

        if (SERVER_SIDE_OPERATIONS.includes(type)) {
          const params = {
            sortKey: tableState.sort.sortState.key,
            sortReverse: tableState.sort.sortState.reverse
          };

          doGetList(params);
        }
      }
    );

    return (
      <Table
        list={list}
        server={{
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
                    array.sort((a, b) => a.name.localeCompare(b.name))
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
    );
  });
