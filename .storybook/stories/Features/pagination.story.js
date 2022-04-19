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

import { usePagination } from '@table-library/react-table-library/pagination';

import { nodes } from '../data';

storiesOf('Features/Pagination', module)
  .addParameters({
    component: Table,
    subcomponents: {
      Header,
      HeaderRow,
      Body,
      Row,
      HeaderCell,
      Cell,
    },
  })
  .add('base', () => {
    const data = { nodes };

    const pagination = usePagination(data, {
      state: {
        page: 0,
        size: 2,
      },
      onChange: onPaginationChange,
    });

    function onPaginationChange(action, state) {
      console.log(action, state);
    }

    return (
      <>
        <Table data={data} pagination={pagination}>
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
                  <Row item={item} key={item.id}>
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

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>

          <span>
            Page:{' '}
            {pagination.state.getPages(data.nodes).map((_, index) => (
              <button
                key={index}
                type="button"
                style={{
                  fontWeight: pagination.state.page === index ? 'bold' : 'normal',
                }}
                onClick={() => pagination.fns.onSetPage(index)}
              >
                {index + 1}
              </button>
            ))}
          </span>
        </div>
      </>
    );
  })
  .add('flexible size', () => {
    const data = { nodes };

    const pagination = usePagination(data, {
      state: {
        page: 0,
        size: 2,
      },
      onChange: onPaginationChange,
    });

    function onPaginationChange(action, state) {
      console.log(action, state);
    }

    const sizes = [1, 2, 5];

    return (
      <>
        <Table data={data} pagination={pagination}>
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
                  <Row item={item} key={item.id}>
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

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>
            Page Size:{' '}
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                style={{
                  fontWeight: pagination.state.size === size ? 'bold' : 'normal',
                }}
                onClick={() => pagination.fns.onSetSize(size)}
              >
                {size}
              </button>
            ))}
            <button
              type="button"
              style={{
                fontWeight: pagination.state.size === nodes.length ? 'bold' : 'normal',
              }}
              onClick={() => pagination.fns.onSetSize(nodes.length)}
            >
              All
            </button>
          </span>

          <span>
            Page:{' '}
            {pagination.state.getPages(data.nodes).map((_, index) => (
              <button
                key={index}
                type="button"
                style={{
                  fontWeight: pagination.state.page === index ? 'bold' : 'normal',
                }}
                onClick={() => pagination.fns.onSetPage(index)}
              >
                {index + 1}
              </button>
            ))}
          </span>
        </div>
      </>
    );
  })
  .add('rows per page', () => {
    const data = { nodes };

    const pagination = usePagination(data, {
      state: {
        page: 0,
        size: 2,
      },
      onChange: onPaginationChange,
    });

    function onPaginationChange(action, state) {
      console.log(action, state);
    }

    return (
      <>
        <Table data={data} pagination={pagination}>
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
                  <Row item={item} key={item.id}>
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

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Total Rows: {data.nodes.length}</span>
          <span>
            Rows per page: {pagination.state.getPageBoundaries(data.nodes).start}
            {'-'}
            {pagination.state.getPageBoundaries(data.nodes).end}
            {' of '}
            {data.nodes.length}{' '}
            <button
              type="button"
              disabled={pagination.state.page === 0}
              onClick={() => pagination.fns.onSetPage(0)}
            >
              {'|<'}
            </button>
            <button
              type="button"
              disabled={pagination.state.page === 0}
              onClick={() => pagination.fns.onSetPage(pagination.state.page - 1)}
            >
              {'<'}
            </button>
            <button
              type="button"
              disabled={pagination.state.page + 1 === pagination.state.getTotalPages(data.nodes)}
              onClick={() => pagination.fns.onSetPage(pagination.state.page + 1)}
            >
              {'>'}
            </button>
            <button
              type="button"
              disabled={pagination.state.page + 1 === pagination.state.getTotalPages(data.nodes)}
              onClick={() =>
                pagination.fns.onSetPage(pagination.state.getTotalPages(data.nodes) - 1)
              }
            >
              {'>|'}
            </button>
          </span>
        </div>
      </>
    );
  });
