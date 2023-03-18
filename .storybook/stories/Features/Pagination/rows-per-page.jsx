import * as React from 'react';

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

import { nodes } from '../../data';

const Component = () => {
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
            onClick={() => pagination.fns.onSetPage(pagination.state.getTotalPages(data.nodes) - 1)}
          >
            {'>|'}
          </button>
        </span>
      </div>
    </>
  );
};

export default Component;
