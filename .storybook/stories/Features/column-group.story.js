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

storiesOf('Features/Column Grouping', module)
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
      HeaderRow: `
        & th.foo {
          color: white;
          background-color: blue;
          grid-column: 1 / span 2;
        }

        & th.bar {
          color: white;
          background-color: orange;
          grid-column: 3 / span 3;
        }

        & th.dissolve {
          display: none;
        }
      `,
      Row: `
        &:nth-of-type(odd) {
          .td:nth-of-type(2) {
            color: white;
            background-color: red;
            grid-column: 2 / span 2;
          }
          .td:nth-of-type(3) {
            display: none;
          }
        }
      `,
    });

    return (
      <Table data={data} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell className="foo">Foo</HeaderCell>
                <HeaderCell className="dissolve" />
                <HeaderCell className="bar">Bar</HeaderCell>
                <HeaderCell className="dissolve" />
                <HeaderCell className="dissolve" />
              </HeaderRow>
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
