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

storiesOf('01. Features/ 07. Search', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const [search, setSearch] = React.useState('');

    const handleSearch = event => {
      setSearch(event.target.value);
    };

    const searchedList = list.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <>
        <label htmlFor="search">
          Search by name:
          <input id="search" type="text" onChange={handleSearch} />
        </label>

        <Table list={searchedList}>
          {tableList => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>Name</HeaderCell>
                  <HeaderCell>Stars</HeaderCell>
                  <HeaderCell>Light</HeaderCell>
                  <HeaderCell>Count</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map(item => (
                  <Row key={item.id} item={item}>
                    {tableItem => (
                      <React.Fragment key={tableItem.id}>
                        <Cell>{tableItem.name}</Cell>
                        <Cell>{tableItem.stars}</Cell>
                        <Cell>{tableItem.light.toString()}</Cell>
                        <Cell>{tableItem.count}</Cell>
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
