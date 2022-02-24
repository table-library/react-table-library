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

storiesOf('Composites/Resize & Pin', module)
  .addParameters({ component: Table })
  .add('base', () => {
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
        <Table data={data} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell resize pin>
                    Task
                  </HeaderCell>
                  <HeaderCell resize pin>
                    Deadline
                  </HeaderCell>
                  <HeaderCell resize>Type</HeaderCell>
                  <HeaderCell resize>Complete</HeaderCell>
                  <HeaderCell resize>Tasks</HeaderCell>
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
  });
