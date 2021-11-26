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

storiesOf('Kitchen Sink/Table in Table', module)
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

    const [ids, setIds] = React.useState([]);

    const handleExpand = (item) => {
      if (ids.includes(item.id)) {
        setIds(ids.filter((id) => id !== item.id));
      } else {
        setIds(ids.concat(item.id));
      }
    };

    return (
      <Table data={data}>
        {(tableListPrimary) => (
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
              {tableListPrimary.map((item) => (
                <React.Fragment key={item.id}>
                  <Row item={item} onClick={handleExpand}>
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

                  {ids.includes(item.id) && (
                    <div style={{ padding: '20px' }}>
                      <Table data={{ nodes: item.nodes || [] }}>
                        {(tableListSecondary) => (
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
                              {tableListSecondary.map((item) => (
                                <React.Fragment key={item.id}>
                                  <Row
                                    item={item}
                                    onClick={handleExpand}
                                  >
                                    <Cell>{item.name}</Cell>
                                    <Cell>
                                      {item.deadline.toLocaleDateString(
                                        'en-US',
                                        {
                                          year: 'numeric',
                                          month: '2-digit',
                                          day: '2-digit',
                                        }
                                      )}
                                    </Cell>
                                    <Cell>{item.type}</Cell>
                                    <Cell>
                                      {item.isComplete.toString()}
                                    </Cell>
                                    <Cell>{item.nodes?.length}</Cell>
                                  </Row>
                                </React.Fragment>
                              ))}
                            </Body>
                          </>
                        )}
                      </Table>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });
