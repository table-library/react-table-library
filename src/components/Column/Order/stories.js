/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell
} from '@table';

const list = [
  { id: '1', name: 'Hello', stars: 24, count: 42, light: true },
  { id: '2', name: 'There', stars: 42, count: 24, light: false },
  { id: '3', name: 'Nice', stars: 111, count: 111, light: true },
  { id: '4', name: 'To', stars: 122, count: 133, light: false },
  { id: '5', name: 'Meet', stars: 133, count: 122, light: true },
  { id: '6', name: 'You', stars: 155, count: 155, light: true },
  {
    id: '7',
    name: 'And Welcome To This Table Folks',
    stars: 155,
    count: 155,
    light: true
  }
];

storiesOf('01. Features/ 11. Column Ordering', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const [columns, setColumns] = React.useState([
      { label: 'Name', get: v => v.name },
      { label: 'Stars', get: v => v.stars },
      { label: 'Light', get: v => v.light.toString() },
      { label: 'Count', get: v => v.count }
    ]);

    const handleOrder = () => {
      setColumns([...columns].sort(() => 0.5 - Math.random()));
    };

    return (
      <>
        <button type="button" onClick={handleOrder}>
          Shuffle
        </button>

        <Table list={list}>
          {tableList => (
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
                {tableList.map(item => (
                  <Row key={item.id} item={item}>
                    {columns.map((column, index) => (
                      <Cell key={index}>{column.get(item)}</Cell>
                    ))}
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </>
    );
  });
