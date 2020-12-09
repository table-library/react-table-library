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
} from '@table-library/react-table-library/lib/table';

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

storiesOf('01. Features/ 12. Column Hiding', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const [columns, setColumns] = React.useState([
      'name',
      'stars',
      'light',
      'count'
    ]);

    const handleColumns = column => {
      if (columns.includes(column)) {
        setColumns(columns.filter(value => value !== column));
      } else {
        setColumns(columns.concat(column));
      }
    };

    return (
      <>
        <div>
          <label htmlFor="name">
            <input
              id="name"
              type="checkbox"
              value="name"
              checked={columns.includes('name')}
              onChange={() => handleColumns('name')}
            />
            Name
          </label>
        </div>

        <div>
          <label htmlFor="stars">
            <input
              id="stars"
              type="checkbox"
              value="stars"
              checked={columns.includes('stars')}
              onChange={() => handleColumns('stars')}
            />
            Stars
          </label>
        </div>

        <div>
          <label htmlFor="light">
            <input
              id="light"
              type="checkbox"
              value="light"
              checked={columns.includes('light')}
              onChange={() => handleColumns('light')}
            />
            Light
          </label>
        </div>

        <div>
          <label htmlFor="count">
            <input
              id="count"
              type="checkbox"
              value="count"
              checked={columns.includes('count')}
              onChange={() => handleColumns('count')}
            />
            Count
          </label>
        </div>

        <Table list={list}>
          {tableList => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell hide={!columns.includes('name')}>
                    Name
                  </HeaderCell>
                  <HeaderCell hide={!columns.includes('stars')}>
                    Stars
                  </HeaderCell>
                  <HeaderCell hide={!columns.includes('light')}>
                    Light
                  </HeaderCell>
                  <HeaderCell hide={!columns.includes('count')}>
                    Count
                  </HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map(item => (
                  <Row key={item.id} item={item}>
                    {tableItem => (
                      <React.Fragment key={tableItem.id}>
                        <Cell hide={!columns.includes('name')}>
                          {tableItem.name}
                        </Cell>
                        <Cell hide={!columns.includes('stars')}>
                          {tableItem.stars}
                        </Cell>
                        <Cell hide={!columns.includes('light')}>
                          {tableItem.light.toString()}
                        </Cell>
                        <Cell hide={!columns.includes('count')}>
                          {tableItem.count}
                        </Cell>
                      </React.Fragment>
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
