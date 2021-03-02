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

import { nodes } from '../data';

storiesOf('Getting Started/Column', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const data = { nodes };

    const columns = [
      { label: 'Task', get: (item) => item.name },
      {
        label: 'Deadline',
        get: (item) =>
          item.deadline.toLocaleDateString('fr-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
      },
      { label: 'Type', get: (item) => item.type },
      {
        label: 'Complete',
        get: (item) => item.isComplete.toString(),
      },
      { label: 'Tasks', get: (item) => item.nodes?.length },
    ];

    return (
      <Table data={data}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                {columns.map((column, index) => (
                  <HeaderCell key={index}>{column.label}</HeaderCell>
                ))}
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  {(tableItem) => (
                    <React.Fragment key={tableItem.id}>
                      {columns.map((column, index) => (
                        <Cell key={index}>
                          {column.get(tableItem)}
                        </Cell>
                      ))}
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
