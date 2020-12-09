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

storiesOf('04. Recipes/ 02. Controlled', module)
  .add('default', () => {
    return (
      <Table list={list}>
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
  .add('controlled inside of table (recommended)', () => {
    const SORTS = {
      none: {
        key: 'none',
        reverse: false,
        fn: array => array
      },
      name: {
        key: 'name',
        reverse: false,
        fn: array =>
          array.sort((a, b) => a.name.localeCompare(b.name))
      },
      stars: {
        key: 'stars',
        reverse: false,
        fn: array => array.sort((a, b) => a.stars - b.stars)
      },
      light: {
        key: 'light',
        reverse: false,
        fn: array => array.sort((a, b) => a.light - b.light)
      },
      count: {
        key: 'count',
        reverse: false,
        fn: array => array.sort((a, b) => a.count - b.count)
      }
    };

    return (
      <Table list={list}>
        {(tableList, { sort }) => (
          <>
            {/* we have explicit access to all table states inside of the table */}
            Active Sort: {sort.sortState.key}
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  sortKey={SORTS.name.key}
                  sortFn={SORTS.name.fn}
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey={SORTS.stars.key}
                  sortFn={SORTS.stars.fn}
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey={SORTS.light.key}
                  sortFn={SORTS.light.fn}
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey={SORTS.count.key}
                  sortFn={SORTS.count.fn}
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
  .add('controlled outside of table', () => {
    const SORTS = {
      none: {
        key: 'none',
        reverse: false,
        fn: array => array
      },
      name: {
        key: 'name',
        reverse: false,
        fn: array =>
          array.sort((a, b) => a.name.localeCompare(b.name))
      },
      stars: {
        key: 'stars',
        reverse: false,
        fn: array => array.sort((a, b) => a.stars - b.stars)
      },
      light: {
        key: 'light',
        reverse: false,
        fn: array => array.sort((a, b) => a.light - b.light)
      },
      count: {
        key: 'count',
        reverse: false,
        fn: array => array.sort((a, b) => a.count - b.count)
      }
    };

    const [key, setKey] = React.useState(null);

    const handleTableStateChange = (type, tableState) => {
      if (type === 'SORT' || type === 'INIT') {
        setKey(tableState.sort.sortState.key);
      }
    };

    return (
      <>
        {/* we have implicit access to all table states outside of the table via onTableStateChange */}
        Active Sort:
        {key}
        <Table
          list={list}
          onTableStateChange={handleTableStateChange}
        >
          {tableList => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCellSort
                    sortKey={SORTS.name.key}
                    sortFn={SORTS.name.fn}
                  >
                    Name
                  </HeaderCellSort>
                  <HeaderCellSort
                    sortKey={SORTS.stars.key}
                    sortFn={SORTS.stars.fn}
                  >
                    Stars
                  </HeaderCellSort>
                  <HeaderCellSort
                    sortKey={SORTS.light.key}
                    sortFn={SORTS.light.fn}
                  >
                    Light
                  </HeaderCellSort>
                  <HeaderCellSort
                    sortKey={SORTS.count.key}
                    sortFn={SORTS.count.fn}
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
      </>
    );
  })
  .add('one-way controlled inside of table (recommended)', () => {
    const SORTS = {
      none: {
        key: 'none',
        reverse: false,
        fn: array => array
      },
      name: {
        key: 'name',
        reverse: false,
        fn: array =>
          array.sort((a, b) => a.name.localeCompare(b.name))
      },
      stars: {
        key: 'stars',
        reverse: false,
        fn: array => array.sort((a, b) => a.stars - b.stars)
      },
      light: {
        key: 'light',
        reverse: false,
        fn: array => array.sort((a, b) => a.light - b.light)
      },
      count: {
        key: 'count',
        reverse: false,
        fn: array => array.sort((a, b) => a.count - b.count)
      }
    };

    const [option, setOption] = React.useState('none');

    // component to table binding
    const handleOption = (event, sort) => {
      setOption(event.target.value);
      sort.onSetSort(SORTS[event.target.value]);
    };

    return (
      <>
        <Table list={list}>
          {(tableList, { sort }) => (
            <>
              <select
                value={option}
                onChange={event => handleOption(event, sort)}
              >
                <option value="none">None</option>
                <option value="name">Name</option>
                <option value="stars">Stars</option>
                <option value="light">Light</option>
                <option value="count">Count</option>
              </select>

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
      </>
    );
  })
  .add('one-way controlled outside of table', () => {
    const SORTS = {
      none: {
        key: 'none',
        reverse: false,
        fn: array => array
      },
      name: {
        key: 'name',
        reverse: false,
        fn: array =>
          array.sort((a, b) => a.name.localeCompare(b.name))
      },
      stars: {
        key: 'stars',
        reverse: false,
        fn: array => array.sort((a, b) => a.stars - b.stars)
      },
      light: {
        key: 'light',
        reverse: false,
        fn: array => array.sort((a, b) => a.light - b.light)
      },
      count: {
        key: 'count',
        reverse: false,
        fn: array => array.sort((a, b) => a.count - b.count)
      }
    };

    const [option, setOption] = React.useState('none');

    const handleOption = event => {
      setOption(event.target.value);
    };

    return (
      <>
        <select value={option} onChange={handleOption}>
          <option value="none">None</option>
          <option value="name">Name</option>
          <option value="stars">Stars</option>
          <option value="light">Light</option>
          <option value="count">Count</option>
        </select>

        <Table
          list={list}
          // outside component to table binding
          defaultSort={SORTS[option]}
        >
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
      </>
    );
  })
  .add('two-way controlled inside of table (recommended)', () => {
    const SORTS = {
      none: {
        key: 'none',
        reverse: false,
        fn: array => array
      },
      name: {
        key: 'name',
        reverse: false,
        fn: array =>
          array.sort((a, b) => a.name.localeCompare(b.name))
      },
      stars: {
        key: 'stars',
        reverse: false,
        fn: array => array.sort((a, b) => a.stars - b.stars)
      },
      light: {
        key: 'light',
        reverse: false,
        fn: array => array.sort((a, b) => a.light - b.light)
      },
      count: {
        key: 'count',
        reverse: false,
        fn: array => array.sort((a, b) => a.count - b.count)
      }
    };

    const [option, setOption] = React.useState(null);

    // omponent to tableState binding
    const handleOption = (event, sort) => {
      sort.onSetSort(SORTS[event.target.value]);
    };

    // tableState to component binding
    const handleTableStateChange = (type, tableState) => {
      if (type === 'SORT' || type === 'INIT') {
        setOption(tableState.sort.sortState.key);
      }
    };

    return (
      <Table list={list} onTableStateChange={handleTableStateChange}>
        {(tableList, { sort }) => (
          <>
            <select
              value={option}
              onChange={event => handleOption(event, sort)}
            >
              <option value="none">None</option>
              <option value="name">Name</option>
              <option value="stars">Stars</option>
              <option value="light">Light</option>
              <option value="count">Count</option>
            </select>

            <Header>
              <HeaderRow>
                <HeaderCellSort
                  sortKey={SORTS.name.key}
                  sortFn={SORTS.name.fn}
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey={SORTS.stars.key}
                  sortFn={SORTS.stars.fn}
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey={SORTS.light.key}
                  sortFn={SORTS.light.fn}
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey={SORTS.count.key}
                  sortFn={SORTS.count.fn}
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
  .add('two-way controlled outside of table', () => {
    const SORTS = {
      none: {
        key: 'none',
        reverse: false,
        fn: array => array
      },
      name: {
        key: 'name',
        reverse: false,
        fn: array =>
          array.sort((a, b) => a.name.localeCompare(b.name))
      },
      stars: {
        key: 'stars',
        reverse: false,
        fn: array => array.sort((a, b) => a.stars - b.stars)
      },
      light: {
        key: 'light',
        reverse: false,
        fn: array => array.sort((a, b) => a.light - b.light)
      },
      count: {
        key: 'count',
        reverse: false,
        fn: array => array.sort((a, b) => a.count - b.count)
      }
    };

    const [option, setOption] = React.useState(null);

    const handleOption = event => {
      setOption(event.target.value);
    };

    // table to outside component binding
    const handleTableStateChange = (type, tableState) => {
      if (type === 'SORT' || type === 'INIT') {
        setOption(tableState.sort.sortState.key);
      }
    };

    return (
      <>
        <select value={option} onChange={handleOption}>
          <option value="none">None</option>
          <option value="name">Name</option>
          <option value="stars">Stars</option>
          <option value="light">Light</option>
          <option value="count">Count</option>
        </select>

        <Table
          list={list}
          // outside component to table binding
          defaultSort={SORTS[option]}
          onTableStateChange={handleTableStateChange}
        >
          {tableList => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCellSort
                    sortKey={SORTS.name.key}
                    sortFn={SORTS.name.fn}
                  >
                    Name
                  </HeaderCellSort>
                  <HeaderCellSort
                    sortKey={SORTS.stars.key}
                    sortFn={SORTS.stars.fn}
                  >
                    Stars
                  </HeaderCellSort>
                  <HeaderCellSort
                    sortKey={SORTS.light.key}
                    sortFn={SORTS.light.fn}
                  >
                    Light
                  </HeaderCellSort>
                  <HeaderCellSort
                    sortKey={SORTS.count.key}
                    sortFn={SORTS.count.fn}
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
      </>
    );
  });
