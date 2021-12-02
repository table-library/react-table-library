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

storiesOf('Features/Pin', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const data = { nodes };

    const theme = useTheme({
      Table: `
        height: 100%;

        overflow-x: auto;
      `,
      BaseCell: `
        &:nth-child(1) {
          left: 0px;

          width: 250px;
          min-width: 250px;
        }

        &:nth-child(2) {
          left: 250px;

          width: 150px;
          min-width: 150px;
        }

        &:nth-child(3), &:nth-child(4), &:nth-child(5) {
          width: 700px;
          min-width: 700px;
        }
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
            width: '100%',
          }}
        >
          <Table data={data} theme={theme} layout={{ custom: true }}>
            {(tableList) => (
              <>
                <Header>
                  <HeaderRow>
                    <HeaderCell className="pin">Task</HeaderCell>
                    <HeaderCell className="pin">Deadline</HeaderCell>
                    <HeaderCell>Type</HeaderCell>
                    <HeaderCell>Complete</HeaderCell>
                    <HeaderCell>Tasks</HeaderCell>
                  </HeaderRow>
                </Header>

                <Body>
                  {tableList.map((item) => (
                    <Row key={item.id} item={item}>
                      <Cell className="pin">{item.name}</Cell>
                      <Cell className="pin">
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
  .add('documentation', () => (
    <ul>
      <li>
        <strong>
          Caveat: Works only with fixed px columns, not %
        </strong>
      </li>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
    </ul>
  ));