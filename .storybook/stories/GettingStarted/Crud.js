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
  Cell
} from '@table-library/react-table-library/lib/table';

import { nodes } from '../data';

storiesOf('01. First Steps/ 04. CRUD Operations (WIP)', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const data = { nodes };

    return (
      <Table data={data}>
        {tableList => (
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
              {tableList.map(item => (
                <Row key={item.id} item={item}>
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'fr-CA',
                          {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
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
    );
  })
  .add('create WIP', () => {
    return <div>create item</div>;
  })
  .add('delete WIP', () => {
    return <div>delete item</div>;
  })
  .add('update WIP', () => {
    return <div>update item</div>;
  });
