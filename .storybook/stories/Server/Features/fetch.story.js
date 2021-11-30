/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
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

import { getData } from '../../server';

storiesOf('Server/Fetch', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const [data, setData] = React.useState({
      nodes: [],
      pageInfo: null,
    });

    const doGet = React.useCallback(async (params) => {
      const { nodes, pageInfo } = await getData(params);

      setData((state) => ({
        pageInfo,
        nodes: [...state.nodes, ...nodes],
      }));
    }, []);

    React.useEffect(() => {
      doGet({ offset: 0, limit: 2 });
    }, [doGet]);

    // features

    const handleLoadMore = (item) => {
      doGet({ offset: item.pageInfo.nextOffset, limit: 2 });
    };

    return (
      <Table data={data}>
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
              {tableList.map((item) => {
                const showLoadMore =
                  data.pageInfo &&
                  data.pageInfo.nextOffset < data.pageInfo.total &&
                  data.nodes[data.nodes.length - 1].id === item.id;

                return (
                  <React.Fragment key={item.id}>
                    <Row item={item}>
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

                    {showLoadMore && (
                      <div>
                        <button
                          type="button"
                          onClick={() => handleLoadMore(item)}
                        >
                          Load More ...
                        </button>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('with loading', () => {
    const [data, setData] = React.useState({
      nodes: [],
      pageInfo: null,
    });

    const doGet = React.useCallback(async (params) => {
      const { nodes, pageInfo } = await getData(params);

      setData((state) => ({
        pageInfo,
        nodes: [...state.nodes, ...nodes],
      }));
    }, []);

    React.useEffect(() => {
      doGet({ offset: 0, limit: 2 });
    }, [doGet]);

    // features

    const [loadingIds, setLoadingIds] = React.useState([]);

    const handleLoadMore = async (item) => {
      setLoadingIds(loadingIds.concat(item.id));

      await doGet({ offset: item.pageInfo.nextOffset, limit: 2 });

      setLoadingIds(loadingIds.filter((id) => id !== item.id));
    };

    return (
      <Table data={data}>
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
              {tableList.map((item) => {
                const showLoading = loadingIds.includes(item.id);

                const showLoadMore =
                  !showLoading &&
                  data.pageInfo &&
                  data.pageInfo.nextOffset < data.pageInfo.total &&
                  data.nodes[data.nodes.length - 1].id === item.id;

                return (
                  <React.Fragment key={item.id}>
                    <Row item={item}>
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

                    {showLoading && <div>Loading ...</div>}

                    {showLoadMore && (
                      <div>
                        <button
                          type="button"
                          onClick={() => handleLoadMore(item)}
                        >
                          Load More ...
                        </button>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('documentation', () => (
    <ul>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
    </ul>
  ));
