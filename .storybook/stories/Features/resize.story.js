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
import { useTheme } from '@table-library/react-table-library/theme';

import { nodes } from '../data';

storiesOf('Features/Resize', module)
  .addParameters({ component: Table })
  .add('tutorial', () => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.robinwieruch.de/react-table-resize"
    >
      Tutorial
    </a>
  ))
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
                <HeaderCell resize>Tasks</HeaderCell>
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

    const resize = { minWidth: 50 };

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
                <HeaderCell resize={resize}>Tasks</HeaderCell>
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

    const resize = { resizerWidth: 30 };

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
                <HeaderCell resize={resize}>Tasks</HeaderCell>
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

    const resize = { resizerHighlight: '#ff0000' };

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
                <HeaderCell resize={resize}>Tasks</HeaderCell>
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
  .add('offset', () => {
    const theme = useTheme({
      BaseRow: `
        padding-left: 32px;
        padding-right: 16px;
      `,
    });

    const data = { nodes };

    const resize = { offset: 48 };

    return (
      <Table data={data} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell resize={resize}>Task</HeaderCell>
                <HeaderCell resize={resize}>Deadline</HeaderCell>
                <HeaderCell resize={resize}>Type</HeaderCell>
                <HeaderCell resize={resize}>Complete</HeaderCell>
                <HeaderCell resize={resize}>Tasks</HeaderCell>
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
