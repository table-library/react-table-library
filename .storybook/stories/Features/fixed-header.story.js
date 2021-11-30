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

storiesOf('Features/Fixed Header', module)
  .addParameters({ component: Table })
  .add('height', () => {
    const data = { nodes };

    const theme = useTheme({
      Table: `
        height: 100%;
      `,
    });

    return (
      // check .storybook/preview.js for body style
      <>
        <div
          style={{
            height: '40%',
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Some Navigation
        </div>
        <div
          style={{
            height: '20%',
          }}
        >
          <Table data={data} theme={theme}>
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
        <div
          style={{
            height: '40%',
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Some Footer
        </div>
      </>
    );
  })
  .add('flex', () => {
    const data = { nodes };

    const theme = useTheme({
      Table: `
        flex: 1;
      `,
    });

    return (
      // check .storybook/preview.js for body style
      <>
        <div
          style={{
            height: '40%',
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Some Navigation
        </div>
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <div
            style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
            }}
          >
            <Table data={data} theme={theme}>
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
        </div>
        <div
          style={{
            height: '40%',
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Some Footer
        </div>
      </>
    );
  })
  .add('documentation', () => (
    <ul>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.robinwieruch.de/react-table-fixed-header"
        >
          Tutorial
        </a>
      </li>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
    </ul>
  ));
