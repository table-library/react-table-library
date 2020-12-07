/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { Table, Header, HeaderRow, Body, Row, Cell } from '@table';

import { HeaderCellSort } from '@sort';

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

storiesOf('04. Recipes/ 01. On Table State Change', module)
  .add('default', () => {
    const handleTableStateChange = (type, sort) => {
      console.log(type, sort);
    };

    return (
      <Table
        list={list}
        tableStateChange={{
          onTableStateChange: handleTableStateChange
        }}
      >
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  sortKey="name"
                  sortFn={array =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="stars"
                  sortFn={array =>
                    array.sort((a, b) => a.stars - b.stars)
                  }
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="light"
                  sortFn={array =>
                    array.sort((a, b) => a.light - b.light)
                  }
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="count"
                  sortFn={array =>
                    array.sort((a, b) => a.count - b.count)
                  }
                >
                  Count
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row item={item} key={item.id}>
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
    );
  })
  .add('notify on mount', () => {
    const handleTableStateChange = (type, sort) => {
      console.log(type, sort);
    };

    return (
      <Table
        list={list}
        tableStateChange={{
          notifyOnMount: true,
          onTableStateChange: handleTableStateChange
        }}
      >
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  sortKey="name"
                  sortFn={array =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="stars"
                  sortFn={array =>
                    array.sort((a, b) => a.stars - b.stars)
                  }
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="light"
                  sortFn={array =>
                    array.sort((a, b) => a.light - b.light)
                  }
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="count"
                  sortFn={array =>
                    array.sort((a, b) => a.count - b.count)
                  }
                >
                  Count
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row item={item} key={item.id}>
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
    );
  });
