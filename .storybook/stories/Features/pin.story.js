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

storiesOf('Features/Pin', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const data = { nodes };

    const theme = useTheme({
      BaseCell: `
        &:nth-child(1) {
          left: 0px;

          min-width: 250px;
          width: 250px;
        }

        &:nth-child(2) {
          left: 250px;

          min-width: 150px;
          width: 150px;
        }

        &:nth-child(3) {
          min-width: 20%;
          width: 20%;
        }

        &:nth-child(4), &:nth-child(5) {
          min-width: 700px;
          width: 700px;
        }
      `,
    });

    return (
      <Table
        data={data}
        theme={theme}
        layout={{ custom: true, horizontalScroll: true }}
      >
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell pin>Task</HeaderCell>
                <HeaderCell pin>Deadline</HeaderCell>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Complete</HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell pin>{item.name}</Cell>
                  <Cell pin>
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
  .add('+ vertical scroll', () => {
    const data = { nodes };

    const theme = useTheme({
      Table: `
        height: 100%;
      `,
      BaseCell: `
        &:nth-child(1) {
          left: 0px;

          min-width: 250px;
          width: 250px;
        }

        &:nth-child(2) {
          left: 250px;

          min-width: 150px;
          width: 150px;
        }

        &:nth-child(3) {
          min-width: 20%;
          width: 20%;
        }

        &:nth-child(4), &:nth-child(5) {
          min-width: 700px;
          width: 700px;
        }
      `,
    });

    return (
      <div
        style={{
          height: '150px',
        }}
      >
        <Table
          data={data}
          theme={theme}
          layout={{ custom: true, horizontalScroll: true }}
        >
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell pin>Task</HeaderCell>
                  <HeaderCell pin>Deadline</HeaderCell>
                  <HeaderCell>Type</HeaderCell>
                  <HeaderCell>Complete</HeaderCell>
                  <HeaderCell>Tasks</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <Cell pin>{item.name}</Cell>
                    <Cell pin>
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
      </div>
    );
  })
  .add('documentation', () => (
    <ul>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
      <li>
        <strong>Caveats: </strong>
        <ul>
          <li>% can be used, even a sum of % that's above 100%</li>
          <li>
            When resize feature is active, a resize transforms all %
            to px columns
          </li>
        </ul>
      </li>
    </ul>
  ));
