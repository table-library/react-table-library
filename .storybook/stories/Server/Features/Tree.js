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

import {
  HeaderCellSelect,
  CellSelect,
  useSelectRow,
  SELECT_TYPES
} from '@table-library/react-table-library/lib/select';

import {
  useTreeRow,
  CellTree,
  TREE_EXPAND_TYPES
} from '@table-library/react-table-library/lib/tree';

import { get } from '../server/tree';

storiesOf('06. Server/ 05. Tree', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const [list, setList] = React.useState([]);

    const doGet = React.useCallback(async params => {
      setList(await get(params));
    }, []);

    React.useEffect(() => {
      doGet({});
    }, [doGet]);

    const handleTableStateChange = React.useCallback(
      (type, tableState, action) => {
        console.log(type, tableState, action);

        // const SERVER_SIDE_OPERATIONS = ['sort'];

        // if (SERVER_SIDE_OPERATIONS.includes(type)) {
        //   const params = {
        //     sortKey: tableState.sort.sortState.key,
        //     sortReverse: tableState.sort.sortState.reverse
        //   };

        // doGet(params);
        // }
      }
    );

    return (
      <Table list={list} onTableStateChange={handleTableStateChange}>
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
                <Row
                  key={item.id}
                  item={item}
                  plugins={[
                    { plugin: useTreeRow },
                    { plugin: useSelectRow }
                  ]}
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellTree item={tableItem}>
                        {tableItem.name}
                      </CellTree>
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
