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

storiesOf('Misc/Column', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const data = { nodes };

    const columns = [
      { label: 'Task', get: (item) => item.name },
      {
        label: 'Deadline',
        get: (item) =>
          item.deadline.toLocaleDateString('en-US', {
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
                  {columns.map((column, index) => (
                    <Cell key={index}>{column.get(item)}</Cell>
                  ))}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('documentation', () => (
    <ul>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
    </ul>
  ));
