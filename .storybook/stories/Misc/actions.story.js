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

storiesOf('Misc/Actions', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const data = { nodes };

    const theme = useTheme({
      Row: `
        &:hover {
          .td:nth-of-type(5) button {
            opacity: 1;
          }
        }
      `,
      BaseCell: `
        &:nth-of-type(1), &:nth-of-type(3), &:nth-of-type(4), &:nth-of-type(5) {
          min-width: 10%;
          width: 10%;
        }

        &:nth-of-type(2) {
          min-width: 50px;
          width: 50px;

          div {
            width: 100%;
          }
        }

        &:nth-of-type(5) {
          button {
            opacity: 0;
          }
        }

        &:nth-of-type(6) {
          flex: 1;
        }
      `,
    });

    return (
      <Table data={data} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Task</HeaderCell>
                <HeaderCell stiff />
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
                  <Cell stiff>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <button>A</button>
                    </div>
                  </Cell>
                  <Cell>
                    {item.deadline.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Cell>
                  <Cell>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ marginRight: '4px' }}>{item.type}</span>
                      <button>B</button>
                    </div>
                  </Cell>
                  <Cell>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span>{item.isComplete.toString()}</span>
                      <button>C</button>
                    </div>
                  </Cell>
                  <Cell>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span>{item.nodes?.length}</span>
                      <button>D</button>
                    </div>
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });
