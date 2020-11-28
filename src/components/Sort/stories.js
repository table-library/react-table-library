/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { storiesOf } from '@storybook/react';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import {
  Table,
  Content,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell
} from '@table';

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

storiesOf('03. Table with Sort', module)
  .addParameters({ component: Table })
  .add('default', () => {
    return (
      <Table list={list}>
        {tableList => (
          <Content>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  width="25%"
                  sortKey="name"
                  sortFn={array =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
                  sortKey="stars"
                  sortFn={array =>
                    array.sort((a, b) => a.stars - b.stars)
                  }
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
                  sortKey="light"
                  sortFn={array =>
                    array.sort((a, b) => a.light - b.light)
                  }
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
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
                <Row key={item.id}>
                  <Cell width="25%">{item.name}</Cell>
                  <Cell width="25%">{item.stars}</Cell>
                  <Cell width="25%">{item.light.toString()}</Cell>
                  <Cell width="25%">{item.count}</Cell>
                </Row>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  })
  .add('default sort', () => {
    const defaultSort = {
      key: 'name',
      reverse: false,
      fn: array => array.sort((a, b) => a.name.localeCompare(b.name))
    };

    return (
      <Table list={list} defaultSort={defaultSort}>
        {tableList => (
          <Content>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  width="25%"
                  sortKey="name"
                  sortFn={array =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
                  sortKey="stars"
                  sortFn={array =>
                    array.sort((a, b) => a.stars - b.stars)
                  }
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
                  sortKey="light"
                  sortFn={array =>
                    array.sort((a, b) => a.light - b.light)
                  }
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
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
                <Row key={item.id}>
                  <Cell width="25%">{item.name}</Cell>
                  <Cell width="25%">{item.stars}</Cell>
                  <Cell width="25%">{item.light.toString()}</Cell>
                  <Cell width="25%">{item.count}</Cell>
                </Row>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  })
  .add('sort icon size ', () => {
    return (
      <Table list={list}>
        {tableList => (
          <Content>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  width="25%"
                  sortKey="name"
                  sortFn={array =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                  sortIcon={{
                    size: '10px'
                  }}
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
                  sortKey="stars"
                  sortFn={array =>
                    array.sort((a, b) => a.stars - b.stars)
                  }
                  sortIcon={{
                    size: '10px'
                  }}
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
                  sortKey="light"
                  sortFn={array =>
                    array.sort((a, b) => a.light - b.light)
                  }
                  sortIcon={{
                    size: '10px'
                  }}
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
                  sortKey="count"
                  sortFn={array =>
                    array.sort((a, b) => a.count - b.count)
                  }
                  sortIcon={{
                    size: '10px'
                  }}
                >
                  Count
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row key={item.id}>
                  <Cell width="25%">{item.name}</Cell>
                  <Cell width="25%">{item.stars}</Cell>
                  <Cell width="25%">{item.light.toString()}</Cell>
                  <Cell width="25%">{item.count}</Cell>
                </Row>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  })
  .add('sort icon position ', () => {
    return (
      <Table list={list}>
        {tableList => (
          <Content>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  width="25%"
                  sortKey="name"
                  sortFn={array =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                  sortIcon={{
                    position:
                      HeaderCellSort.SORT_ICON_POSITIONS.Prefix
                  }}
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
                  sortKey="stars"
                  sortFn={array =>
                    array.sort((a, b) => a.stars - b.stars)
                  }
                  sortIcon={{
                    position:
                      HeaderCellSort.SORT_ICON_POSITIONS.Prefix
                  }}
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
                  sortKey="light"
                  sortFn={array =>
                    array.sort((a, b) => a.light - b.light)
                  }
                  sortIcon={{
                    position:
                      HeaderCellSort.SORT_ICON_POSITIONS.Prefix
                  }}
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
                  sortKey="count"
                  sortFn={array =>
                    array.sort((a, b) => a.count - b.count)
                  }
                  sortIcon={{
                    position:
                      HeaderCellSort.SORT_ICON_POSITIONS.Prefix
                  }}
                >
                  Count
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row key={item.id}>
                  <Cell width="25%">{item.name}</Cell>
                  <Cell width="25%">{item.stars}</Cell>
                  <Cell width="25%">{item.light.toString()}</Cell>
                  <Cell width="25%">{item.count}</Cell>
                </Row>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  })
  .add('indentation ', () => {
    return (
      <Table list={list}>
        {tableList => (
          <Content>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  width="25%"
                  sortKey="name"
                  sortFn={array =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                  sortIcon={{
                    position:
                      HeaderCellSort.SORT_ICON_POSITIONS.Prefix
                  }}
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
                  sortKey="stars"
                  sortFn={array =>
                    array.sort((a, b) => a.stars - b.stars)
                  }
                  sortIcon={{
                    position:
                      HeaderCellSort.SORT_ICON_POSITIONS.Prefix
                  }}
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
                  sortKey="light"
                  sortFn={array =>
                    array.sort((a, b) => a.light - b.light)
                  }
                  sortIcon={{
                    position:
                      HeaderCellSort.SORT_ICON_POSITIONS.Prefix
                  }}
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
                  sortKey="count"
                  sortFn={array =>
                    array.sort((a, b) => a.count - b.count)
                  }
                  sortIcon={{
                    position:
                      HeaderCellSort.SORT_ICON_POSITIONS.Prefix
                  }}
                >
                  Count
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row key={item.id}>
                  <Cell width="25%" indentation={18}>
                    {item.name}
                  </Cell>
                  <Cell width="25%" indentation={18}>
                    {item.stars}
                  </Cell>
                  <Cell width="25%" indentation={18}>
                    {item.light.toString()}
                  </Cell>
                  <Cell width="25%" indentation={18}>
                    {item.count}
                  </Cell>
                </Row>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  })
  .add('custom sort icon (Material UI)', () => {
    return (
      <Table list={list}>
        {tableList => (
          <Content>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  width="25%"
                  sortKey="name"
                  sortFn={array =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                  sortIcon={{
                    margin: '0px',
                    iconDefault: null,
                    iconUp: <KeyboardArrowUpIcon fontSize="small" />,
                    iconDown: (
                      <KeyboardArrowDownIcon fontSize="small" />
                    )
                  }}
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
                  sortKey="stars"
                  sortFn={array =>
                    array.sort((a, b) => a.stars - b.stars)
                  }
                  sortIcon={{
                    margin: '0px',
                    iconDefault: null,
                    iconUp: <KeyboardArrowUpIcon fontSize="small" />,
                    iconDown: (
                      <KeyboardArrowDownIcon fontSize="small" />
                    )
                  }}
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
                  sortKey="light"
                  sortFn={array =>
                    array.sort((a, b) => a.light - b.light)
                  }
                  sortIcon={{
                    margin: '0px',
                    iconDefault: null,
                    iconUp: <KeyboardArrowUpIcon fontSize="small" />,
                    iconDown: (
                      <KeyboardArrowDownIcon fontSize="small" />
                    )
                  }}
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  width="25%"
                  sortKey="count"
                  sortFn={array =>
                    array.sort((a, b) => a.count - b.count)
                  }
                  sortIcon={{
                    margin: '0px',
                    iconDefault: null,
                    iconUp: <KeyboardArrowUpIcon fontSize="small" />,
                    iconDown: (
                      <KeyboardArrowDownIcon fontSize="small" />
                    )
                  }}
                >
                  Count
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row key={item.id}>
                  <Cell width="25%">{item.name}</Cell>
                  <Cell width="25%">{item.stars}</Cell>
                  <Cell width="25%">{item.light.toString()}</Cell>
                  <Cell width="25%">{item.count}</Cell>
                </Row>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  });
