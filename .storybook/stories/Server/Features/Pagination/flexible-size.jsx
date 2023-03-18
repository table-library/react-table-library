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

import { getData } from '../../../server';

const Component = () => {
  const LIMIT = 2;

  const [data, setData] = React.useState({
    nodes: [],
  });

  const doGet = React.useCallback(async (params) => {
    setData(await getData(params));
  }, []);

  React.useEffect(() => {
    doGet({
      offset: 0,
      limit: LIMIT,
    });
  }, [doGet]);

  // features

  const pagination = usePagination(
    data,
    {
      state: {
        page: 0,
        size: LIMIT,
      },
      onChange: onPaginationChange,
    },
    {
      isServer: true,
    },
  );

  function onPaginationChange(action, state) {
    doGet({
      offset: state.page * state.size,
      limit: state.size,
    });
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

      {data.pageInfo && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
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
                fontWeight: pagination.state.size === data.pageInfo.total ? 'bold' : 'normal',
              }}
              onClick={() => pagination.fns.onSetSize(data.pageInfo.total)}
            >
              All
            </button>
          </span>

          <span>
            Page:{' '}
            {Array(data.pageInfo.totalPages)
              .fill()
              .map((_, index) => (
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
      )}
    </>
  );
};

export default Component;
