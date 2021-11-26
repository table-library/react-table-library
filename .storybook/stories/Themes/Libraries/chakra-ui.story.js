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

import { nodes } from '../../data';

storiesOf('Library Themes/Chakra UI', module)
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
  .add('base', () => {
    const data = { nodes };

    const theme = useTheme({
      Table: `
        margin: 20px;
        padding: 12px;

        border-radius: 12px;
        border: 1px solid #e2e8f0;
      `,
      BaseRow: `
        color: #4a5568;

        &:hover {
          color: #4a5568;
          cursor: default;
        }

        &:not(:last-child) {
          border-bottom: 1px solid #e2e8f0;
        }
      `,
      HeaderRow: `
        text-transform: uppercase;
        font-size: 12px;
        height: 40px;

        font-weight: bold;

        border-bottom: 1px solid #e2e8f0;
      `,
      Row: `
        font-size: 16px;
        height: 53px;

        &:hover {
          backgorund-color: #fafafa;
        }
      `,
      BaseCell: `
        border-right: 1px solid transparent;
      `,
    });

    return (
      <Table data={data} theme={theme}>
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
                <Row item={item} key={item.id}>
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
