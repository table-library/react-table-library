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

import { get } from '../server/list';

storiesOf('05. Server/ 01. Table', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const [list, setList] = React.useState([]);

    const doGet = React.useCallback(async params => {
      setList(await get(params));
    }, []);

    React.useEffect(() => {
      doGet({});
    }, [doGet]);

    return (
      <Table list={list}>
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
    );
  })
  .add('create WIP', () => {
    return <div>dat fetching</div>;
  })
  .add('delete WIP', () => {
    return <div>dat fetching</div>;
  })
  .add('update WIP', () => {
    return <div>dat fetching</div>;
  });
