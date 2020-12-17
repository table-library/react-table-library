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

import {
  useTreeRow,
  CellTree
} from '@table-library/react-table-library/lib/tree';

import {
  useExpandRow,
  EXPAND_TYPES
} from '@table-library/react-table-library/lib/expand';

import { useFetch } from '@table-library/react-table-library/lib/fetch';

import { get as getSimpleStree } from '../server/tree/simple';
import { get as getIterativeTree } from '../server/tree/iterative';
import { get as getPaginatedTree } from '../server/tree/pagination';

const findItemById = (nodes, id) =>
  nodes.reduce((acc, value) => {
    if (acc) return acc;

    if (value.id === id) {
      acc = value;
    } else if (value.nodes) {
      acc = findItemById(value.nodes, id);
    }

    return acc;
  }, null);

const needsToFetch = (nodes, id) => {
  const item = findItemById(nodes, id);

  return item && item.hasContent && item.nodes && !item.nodes.length;
};

storiesOf('06. Server/ 05. Tree', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const [tree, setList] = React.useState([]);

    const doGet = React.useCallback(async params => {
      setList(await getSimpleStree(params));
    }, []);

    React.useEffect(() => {
      doGet({});
    }, [doGet]);

    return (
      <Table data={{ nodes: tree }}>
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
                <Row
                  key={item.id}
                  item={item}
                  plugins={[{ plugin: useTreeRow }]}
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellTree item={tableItem}>
                        {tableItem.name}
                      </CellTree>
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
  .add('fetch iterative', () => {
    const [tree, setList] = React.useState([]);

    const doGet = React.useCallback(async params => {
      setList(await getIterativeTree(params));
    }, []);

    React.useEffect(() => {
      doGet({});
    }, [doGet]);

    const doGetNested = React.useCallback(
      async params => {
        if (!needsToFetch(tree, params.id)) return;

        const nestedNodes = await getIterativeTree(params);

        const insert = item => {
          if (item.id === params.id) {
            return {
              ...item,
              nodes: [...item.nodes, ...nestedNodes]
            };
          } else if (item.nodes) {
            return { ...item, nodes: item.nodes.map(insert) };
          } else {
            return item;
          }
        };

        setList(tree.map(insert));
      },
      [tree]
    );

    const handleTableStateChange = React.useCallback(
      (type, tableState, action) => {
        console.log(type, tableState, action);

        const SERVER_SIDE_OPERATIONS = ['tree'];

        let params = {};

        if (action.type === 'ADD_TREE_EXPAND_BY_ID') {
          params = {
            ...params,
            id: action.payload.id
          };
        }

        if (SERVER_SIDE_OPERATIONS.includes(type)) {
          doGetNested(params);
        }
      },
      [doGetNested]
    );

    return (
      <Table
        data={{ nodes: tree }}
        onTableStateChange={handleTableStateChange}
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
                <Row
                  key={item.id}
                  item={item}
                  plugins={[{ plugin: useTreeRow }]}
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellTree item={tableItem}>
                        {tableItem.name}
                      </CellTree>
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
  .add('fetch iterative (loading)', () => {
    const [tree, setList] = React.useState([]);

    const doGet = React.useCallback(async params => {
      setList(await getIterativeTree(params));
    }, []);

    React.useEffect(() => {
      doGet({});
    }, [doGet]);

    const doGetNested = React.useCallback(
      async params => {
        if (!needsToFetch(tree, params.id)) return;

        const nestedNodes = await getIterativeTree(params);

        const insert = item => {
          if (item.id === params.id) {
            return {
              ...item,
              nodes: [...item.nodes, ...nestedNodes]
            };
          } else if (item.nodes) {
            return { ...item, nodes: item.nodes.map(insert) };
          } else {
            return item;
          }
        };

        setList(tree.map(insert));
      },
      [tree]
    );

    const handleTableStateChange = React.useCallback(
      (type, tableState, action) => {
        console.log(type, tableState, action);

        const SERVER_SIDE_OPERATIONS = ['tree'];

        let params = {};

        if (action.type === 'ADD_TREE_EXPAND_BY_ID') {
          params = {
            ...params,
            id: action.payload.id
          };
        }

        if (SERVER_SIDE_OPERATIONS.includes(type)) {
          doGetNested(params);
        }
      },
      [doGetNested]
    );

    const LoadingPanel = () => <div>Loading ...</div>;

    return (
      <Table
        data={{ nodes: tree }}
        onTableStateChange={handleTableStateChange}
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
                <Row
                  key={item.id}
                  item={item}
                  plugins={[
                    {
                      plugin: useTreeRow,
                      options: {
                        panelShowCondition: tableItem =>
                          tableItem.hasContent &&
                          !tableItem.nodes.length,
                        loadingPanel: LoadingPanel
                      }
                    },
                    {
                      plugin: useExpandRow,
                      options: {
                        expandType: EXPAND_TYPES.NoClick,
                        expansionPanel: () => (
                          <div
                            style={{
                              background: 'grey'
                            }}
                          >
                            Loading ...
                          </div>
                        )
                      }
                    }
                  ]}
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellTree item={tableItem}>
                        {tableItem.name}
                      </CellTree>
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
  .add('fetch iterative (paginated)', () => {
    const [data, setData] = React.useState({
      nodes: [],
      pageInfo: null
    });

    const doGetPaginated = React.useCallback(async params => {
      const { nodes, pageInfo } = await getPaginatedTree(params);

      if (!params.id) {
        setData(state => ({
          pageInfo,
          nodes: [...state.nodes, ...nodes]
        }));

        return;
      }

      if (params.id) {
        const insert = item => {
          if (item.id === params.id) {
            return {
              ...item,
              nodes: [...item.nodes, ...nodes],
              pageInfo
            };
          } else if (item.nodes) {
            return { ...item, nodes: item.nodes.map(insert) };
          } else {
            return item;
          }
        };

        setData(state => ({
          pageInfo: state.pageInfo,
          nodes: state.nodes.map(insert)
        }));
      }
    }, []);

    React.useEffect(() => {
      doGetPaginated({
        offset: 0,
        limit: 2
      });
    }, [doGetPaginated]);

    const doGetNested = React.useCallback(
      async params => {
        if (!needsToFetch(data.nodes, params.id)) return;

        const { nodes, pageInfo } = await getPaginatedTree(params);

        const insert = item => {
          if (item.id === params.id) {
            return {
              ...item,
              nodes: [...item.nodes, ...nodes],
              pageInfo
            };
          } else if (item.nodes) {
            return { ...item, nodes: item.nodes.map(insert) };
          } else {
            return item;
          }
        };

        setData(state => ({
          pageInfo: state.pageInfo,
          nodes: state.nodes.map(insert)
        }));
      },
      [data]
    );

    const handleTableStateChange = React.useCallback(
      (type, tableState, action) => {
        console.log(type, tableState, action);

        const SERVER_SIDE_OPERATIONS = ['tree'];

        let params = {};

        if (action.type === 'ADD_TREE_EXPAND_BY_ID') {
          params = {
            ...params,
            id: action.payload.id,
            offset: 0,
            limit: 1
          };
        }

        if (SERVER_SIDE_OPERATIONS.includes(type)) {
          doGetNested(params);
        }
      },
      [doGetNested]
    );

    const handleLoadMore = React.useCallback(
      async (tableState, tableItem) => {
        console.log(tableState, tableItem);

        let params = {
          id: tableItem.id,
          offset: tableItem.pageInfo.nextOffset,
          limit: 2
        };

        return doGetPaginated(params);
      },
      [data]
    );

    const LoadingPanel = () => <div>Loading ...</div>;

    const IdlePanel = () => (
      <button onClick={handleLoadMore}>More ...</button>
    );

    return (
      <Table data={data} onTableStateChange={handleTableStateChange}>
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
                <Row
                  key={item.id}
                  item={item}
                  plugins={[
                    {
                      plugin: useTreeRow,
                      options: {
                        panelShowCondition: tableItem =>
                          tableItem.hasContent &&
                          !tableItem.nodes.length,
                        loadingPanel: LoadingPanel
                      }
                    },
                    {
                      plugin: useFetch,
                      options: {
                        panelShowCondition: tableItem =>
                          tableItem.pageInfo &&
                          tableItem.pageInfo.nextOffset <
                            tableItem.pageInfo.total,
                        idlePanel: IdlePanel,
                        loadingPanel: LoadingPanel
                      }
                    }
                  ]}
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellTree item={tableItem}>
                        {tableItem.name}
                      </CellTree>
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
