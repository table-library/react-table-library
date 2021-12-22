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

storiesOf('Composites/Resize & Horizontal', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const data = { nodes };

    const theme = useTheme({
      Table: `
        height: 100%;
      `,
      BaseCell: `
        &:nth-child(1) {
          min-width: 50%;
          width: 50%;
        }

        &:nth-child(2) {
          min-width: 200px;
          width: 200px;
        }

        &:nth-child(3), &:nth-child(4) {
          min-width: 25%;
          width: 25%;
        }

        &:nth-child(5) {
          min-width: 50%;
          width: 50%;
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
  });
