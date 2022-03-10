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

storiesOf('Features/Horizontal Scroll', module)
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

    const theme = useTheme({
      BaseCell: `
        &:nth-of-type(1) {
          min-width: 50%;
          width: 50%;
        }

        &:nth-of-type(2) {
          min-width: 200px;
          width: 200px;
        }

        &:nth-of-type(3), &:nth-of-type(4) {
          min-width: 25%;
          width: 25%;
        }

        &:nth-of-type(5) {
          min-width: 50%;
          width: 50%;
        }
      `,
    });

    return (
      <Table data={data} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
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
  .add('+ vertical scroll', () => {
    const data = { nodes };

    const theme = useTheme({
      Table: `
        height: 100%;
      `,
      BaseCell: `
        &:nth-of-type(1) {
          min-width: 50%;
          width: 50%;
        }

        &:nth-of-type(2) {
          min-width: 200px;
          width: 200px;
        }

        &:nth-of-type(3), &:nth-of-type(4) {
          min-width: 25%;
          width: 25%;
        }

        &:nth-of-type(5) {
          min-width: 50%;
          width: 50%;
        }
      `,
    });

    return (
      <div
        style={{
          height: '150px',
        }}
      >
        <Table data={data} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
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
      </div>
    );
  })
  .add('documentation', () => (
    <ul>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.robinwieruch.de/react-table-fixed-header/"
        >
          Tutorial
        </a>
      </li>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
      <li>
        <strong>Caveats: </strong>
        <ul>
          <li>% can be used, even a sum of % that's above 100%</li>
          <li>When resize feature is active, a resize transforms all % to px columns though</li>
        </ul>
      </li>
    </ul>
  ));
