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

storiesOf('Features/Layout', module)
  .addParameters({ component: Table })
  .add('documentation', () => (
    <ul>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
    </ul>
  ))
  .add('nth-child', () => {
    const theme = useTheme({
      BaseCell: `
        &:nth-child(1) {
          width: 35%;
        }

        &:nth-child(2), &:nth-child(3), &:nth-child(4) {
          width: 15%;
        }

        &:nth-child(5) {
          width: 20%;
        }
      `,
    });

    const data = { nodes };

    return (
      <Table data={data} theme={theme} layout={{ custom: true }}>
        {(tableList) => (
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
  .add('class specific', () => {
    const theme = useTheme({
      BaseCell: `
        &.task {
          width: 35%;
        }

        &.deadline, &.type, &.complete {
          width: 10%;
        }

        &.tasks {
          width: 35%;
        }
      `,
    });

    const data = { nodes };

    return (
      <Table data={data} theme={theme} layout={{ custom: true }}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell className="task">Task</HeaderCell>
                <HeaderCell className="deadline">Deadline</HeaderCell>
                <HeaderCell className="type">Type</HeaderCell>
                <HeaderCell className="complete">Complete</HeaderCell>
                <HeaderCell className="tasks">Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell className="task">{item.name}</Cell>
                  <Cell className="deadline">
                    {item.deadline.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Cell>
                  <Cell className="type">{item.type}</Cell>
                  <Cell className="complete">
                    {item.isComplete.toString()}
                  </Cell>
                  <Cell className="tasks">{item.nodes?.length}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('fixed/remaining space', () => {
    const theme = useTheme({
      BaseCell: `
        &:nth-child(1), &:nth-child(2), &:nth-child(3) {
          width: 15%;
        }

        &:nth-child(4) {
          width: 100px;
        }

        &:nth-child(5) {
          flex: 100px;
        }
      `,
    });

    const data = { nodes };

    return (
      <Table data={data} theme={theme} layout={{ custom: true }}>
        {(tableList) => (
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
