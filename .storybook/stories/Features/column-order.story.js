/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import {
  useCustom,
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import { nodes } from '../data';

storiesOf('Features/Column Ordering', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const data = { nodes };

    const [columns, setColumns] = React.useState([
      { label: 'Task', get: (item) => item.name },
      {
        label: 'Deadline',
        get: (item) =>
          item.deadline.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
      },
      { label: 'Type', get: (item) => item.type },
      {
        label: 'Complete',
        get: (item) => item.isComplete.toString(),
      },
      { label: 'Tasks', get: (item) => item.nodes?.length },
    ]);

    const handleOrder = () => {
      setColumns([...columns].sort(() => 0.5 - Math.random()));
    };

    return (
      <>
        <button type="button" onClick={handleOrder}>
          Shuffle
        </button>

        <Table data={data}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  {columns.map((column, index) => (
                    <HeaderCell key={index}>
                      {column.label}
                    </HeaderCell>
                  ))}
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    {(tableItem) => (
                      <>
                        {columns.map((column, index) => (
                          <Cell key={index}>
                            {column.get(tableItem)}
                          </Cell>
                        ))}
                      </>
                    )}
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </>
    );
  })
  .add('with callback', () => {
    const data = { nodes };

    const [columns, setColumns] = React.useState([
      { label: 'Task', get: (item) => item.name },
      {
        label: 'Deadline',
        get: (item) =>
          item.deadline.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
      },
      { label: 'Type', get: (item) => item.type },
      {
        label: 'Complete',
        get: (item) => item.isComplete.toString(),
      },
      { label: 'Tasks', get: (item) => item.nodes?.length },
    ]);

    const handleOrder = () => {
      setColumns([...columns].sort(() => 0.5 - Math.random()));
    };

    useCustom('columnOrder', data, {
      state: { columns },
      onChange: onColumnOrderChange,
    });

    function onColumnOrderChange(action, state) {
      console.log(action, state);
    }

    return (
      <>
        <button type="button" onClick={handleOrder}>
          Shuffle
        </button>

        <Table data={data}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  {columns.map((column, index) => (
                    <HeaderCell key={index}>
                      {column.label}
                    </HeaderCell>
                  ))}
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    {(tableItem) => (
                      <>
                        {columns.map((column, index) => (
                          <Cell key={index}>
                            {column.get(tableItem)}
                          </Cell>
                        ))}
                      </>
                    )}
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </>
    );
  });
