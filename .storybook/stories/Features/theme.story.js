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

storiesOf('Features/Theme', module)
  .addParameters({ component: Table })
  .add('Ocean Blue', () => {
    const theme = useTheme({
      BaseRow: `
        font-size: 14px;
      `,
      HeaderRow: `
        background-color: #eaf5fd;
      `,
      Row: `
        &:nth-child(odd) {
          background-color: #d2e9fb;
        }

        &:nth-child(even) {
          background-color: #eaf5fd;
        }
      `,
    });

    const data = { nodes };

    return (
      <Table data={data} theme={theme}>
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
  .add('Chess Board', () => {
    const theme = useTheme({
      BaseCell: `
        border-right: 1px solid transparent;
      `,
      Row: `
        &:nth-child(odd) {
          .td:nth-child(even) {
            background-color: #dddddd;
          }

          .td:nth-child(odd) {
            background-color: #fafafa;
          }
        }

        &:nth-child(even) {
          .td:nth-child(odd) {
            background-color: #dddddd;
          }

          .td:nth-child(even) {
            background-color: #fafafa;
          }
        }
      `,
    });

    const data = { nodes };

    return (
      <Table data={data} theme={theme}>
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
  .add('Machine', () => {
    const theme = useTheme({
      HeaderRow: `
        color: #000000;
        border-bottom: 1px solid transparent;
      `,
      Row: `
        color: #363636;

        border-top: 1px solid #a0a8ae;
        border-bottom: 1px solid #a0a8ae;

        position: relative;
        z-index: 1;

        &:not(:last-child) {
          margin-bottom: -1px;
        }

        &:hover {
          z-index: 2;
          border-top: 1px solid #177ac9;
          border-bottom: 1px solid #177ac9;

          color: #177ac9;
        }
      `,
      HeaderCell: `
        margin-top: 9px;
        margin-bottom: 9px;

        padding-top: 11px;
        padding-bottom: 11px;

        border-bottom: 1px solid transparent;
      `,
      Cell: `
        margin-top: 8px;
        margin-bottom: 9px;
      `,
    });

    const data = { nodes };

    return (
      <Table data={data} theme={theme}>
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
  .add('documentation', () => (
    <ul>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.robinwieruch.de/react-table-theme/"
        >
          Tutorial
        </a>
      </li>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
    </ul>
  ));
