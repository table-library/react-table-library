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
import { useTheme } from '@table-library/react-table-library/theme';

import { nodes } from '../data';

storiesOf('Features/Column Grouping', module)
  .addParameters({
    component: Table,
    subcomponents: {
      Header,
      HeaderRow,
      Body,
      Row,
      HeaderCell,
      Cell,
    },
  })
  .add('base', () => {
    const data = { nodes };

    return (
      <Table data={data}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell colSpan={2} style={{ backgroundColor: 'blue', color: 'white' }}>
                  Task
                </HeaderCell>
                <HeaderCell colSpan={2} style={{ backgroundColor: 'green', color: 'white' }}>
                  Type
                </HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item, index) =>
                index === 1 ? (
                  <Row key={item.id} item={item}>
                    <Cell colSpan={3} style={{ backgroundColor: 'red', color: 'white' }}>
                      {item.name}
                    </Cell>
                    <Cell>{item.isComplete.toString()}</Cell>
                    <Cell>{item.nodes?.length}</Cell>
                  </Row>
                ) : index === 2 ? (
                  <Row key={item.id} item={item}>
                    <Cell>{item.name}</Cell>
                    <Cell>
                      {item.deadline.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </Cell>
                    <Cell>{item.type}</Cell>
                    <Cell colSpan={2} style={{ backgroundColor: 'blue', color: 'white' }}>
                      {item.isComplete.toString()}
                    </Cell>
                  </Row>
                ) : index === 3 ? (
                  <Row key={item.id} item={item}>
                    <Cell>{item.name}</Cell>
                    <Cell colSpan={2} style={{ backgroundColor: 'orange', color: 'white' }}>
                      {item.deadline.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </Cell>
                    <Cell>{item.isComplete.toString()}</Cell>
                    <Cell>{item.nodes?.length}</Cell>
                  </Row>
                ) : index === 4 ? (
                  <Row key={item.id} item={item}>
                    <Cell colSpan={2} style={{ backgroundColor: 'green', color: 'white' }}>
                      {item.name}
                    </Cell>
                    <Cell>{item.type}</Cell>
                    <Cell colSpan={2} style={{ backgroundColor: 'green', color: 'white' }}>
                      {item.isComplete.toString()}
                    </Cell>
                  </Row>
                ) : (
                  <Row key={item.id} item={item}>
                    <Cell>{item.name}</Cell>
                    <Cell>
                      {item.deadline.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </Cell>
                    <Cell>{item.type}</Cell>
                    <Cell>{item.isComplete.toString()}</Cell>
                    <Cell>{item.nodes?.length}</Cell>
                  </Row>
                ),
              )}
            </Body>
          </>
        )}
      </Table>
    );
  });
