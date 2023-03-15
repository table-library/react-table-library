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

storiesOf('Features/Resize', module)
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
                <HeaderCell resize>Task</HeaderCell>
                <HeaderCell resize>Deadline</HeaderCell>
                <HeaderCell resize>Type</HeaderCell>
                <HeaderCell resize>Complete</HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
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
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('minWidth', () => {
    const data = { nodes };

    const resize = { minWidth: 25 };

    return (
      <Table data={data}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell resize={resize}>Task</HeaderCell>
                <HeaderCell resize={resize}>Deadline</HeaderCell>
                <HeaderCell resize={resize}>Type</HeaderCell>
                <HeaderCell resize={resize}>Complete</HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
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
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('resizerHighlight', () => {
    const data = { nodes };

    const resize = { resizerHighlight: '#dde2eb' };

    return (
      <Table data={data}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell resize={resize}>Task</HeaderCell>
                <HeaderCell resize={resize}>Deadline</HeaderCell>
                <HeaderCell resize={resize}>Type</HeaderCell>
                <HeaderCell resize={resize}>Complete</HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
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
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('resizerWidth', () => {
    const data = { nodes };

    const resize = { resizerHighlight: '#dde2eb', resizerWidth: 25 };

    return (
      <Table data={data}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell resize={resize}>Task</HeaderCell>
                <HeaderCell resize={resize}>Deadline</HeaderCell>
                <HeaderCell resize={resize}>Type</HeaderCell>
                <HeaderCell resize={resize}>Complete</HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
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
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('on layout change', () => {
    const data = { nodes };

    const handleLayoutChange = (widths) => console.log(widths);

    return (
      <Table data={data} layout={{ onLayoutChange: handleLayoutChange }}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell resize>Task</HeaderCell>
                <HeaderCell resize>Deadline</HeaderCell>
                <HeaderCell resize>Type</HeaderCell>
                <HeaderCell resize>Complete</HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
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
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });
