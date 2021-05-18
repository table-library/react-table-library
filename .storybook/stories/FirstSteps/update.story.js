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

import { nodes } from '../data';

storiesOf('First Steps/Update', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const [data, setData] = React.useState({ nodes });

    const handleUpdate = (value, id) => {
      setData((state) => ({
        ...state,
        nodes: state.nodes.map((node) => {
          if (node.id === id) {
            return { ...node, name: value };
          } else {
            return node;
          }
        }),
      }));
    };

    return (
      <Table data={data}>
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
                  {(tableItem) => (
                    <>
                      <Cell>
                        <input
                          style={{ width: '100%' }}
                          type="text"
                          value={tableItem.name}
                          onChange={(event) =>
                            handleUpdate(
                              event.target.value,
                              tableItem.id
                            )
                          }
                        />
                      </Cell>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          }
                        )}
                      </Cell>
                      <Cell>{tableItem.type}</Cell>
                      <Cell>{tableItem.isComplete.toString()}</Cell>
                      <Cell>{tableItem.nodes?.length}</Cell>
                    </>
                  )}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });
