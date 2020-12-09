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

import { useTableState } from '@table-library/react-table-library/lib/hooks';

import { getList } from '../server/list';

storiesOf('06. Server Recipes/ 02. Origin External', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const [option, setOption] = React.useState('none');

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
      (type, tableState, thirdPartyState) => {
        const SERVER_SIDE_OPERATIONS = ['OUTSIDE_SORT'];

        if (SERVER_SIDE_OPERATIONS.includes(type)) {
          const params = {
            sortKey: thirdPartyState.outsideSort,
            sortReverse: false
          };

          doGetList(params);
        }
      },
      {
        OUTSIDE_SORT: {
          stateKey: 'outsideSort',
          stateValue: option
        }
      }
    );

    const handleOption = event => {
      setOption(event.target.value);
    };

    return (
      <>
        <select value={option} onChange={handleOption}>
          <option value="none">None</option>
          <option value="name">Name</option>
          <option value="stars">Stars</option>
          <option value="light">Light</option>
          <option value="count">Count</option>
        </select>

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
                  <HeaderCell>Name</HeaderCell>
                  <HeaderCell>Stars</HeaderCell>
                  <HeaderCell>Light</HeaderCell>
                  <HeaderCell>Count</HeaderCell>
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
