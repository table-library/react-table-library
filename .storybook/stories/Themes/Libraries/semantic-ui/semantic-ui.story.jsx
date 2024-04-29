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
} from '@overmap-ai/react-table-library/table';

import { useTheme } from '@overmap-ai/react-table-library/theme';

import { nodes } from '../../../data';

storiesOf('Library Themes/Semantic UI (WIP)', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const data = { nodes };

    const theme = useTheme({
      Table: `
        margin: 20px;
        border-radius: 4px;
        border: 1px solid #e3e4e5;
      `,
      BaseRow: `
        color: #212121;

        &:hover {
          color: #212121;
          cursor: default;
        }

        height: 46px;
        font-size: 14px;

        border-bottom: 1px solid #e3e4e5;
      `,
      HeaderRow: `
        font-weight: bold;
        background-color: #f9fafb;;
      `,
      Row: `
        border-bottom: 1px solid #e3e4e5;
      `,
      BaseCell: `
        border-right: 1px solid #e3e4e5;
        border-bottom: 1px solid transparent;
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
