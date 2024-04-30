import * as React from 'react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@overmap-ai/react-table-library/table';
import { usePagination } from '@overmap-ai/react-table-library/pagination';

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
};

export default Component;
