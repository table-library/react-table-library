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
      { label: 'Task', renderCell: (item) => item.name },
      {
        label: 'Deadline',
        renderCell: (item) =>
          item.deadline.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
      },
      { label: 'Type', renderCell: (item) => item.type },
      {
        label: 'Complete',
        renderCell: (item) => item.isComplete.toString(),
      },
      { label: 'Tasks', renderCell: (item) => item.nodes?.length },
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
                    <Cell key={index}>{column.renderCell(item)}</Cell>
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
