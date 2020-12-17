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

const insertTree = (targetId, nodes) => state => {
  if (!targetId) {
    return nodes;
  }

  const recursiveInsert = item => {
    if (item.id === targetId) {
      return {
        ...item,
        nodes: [...item.nodes, ...nodes]
      };
    } else if (item.nodes) {
      return { ...item, nodes: item.nodes.map(recursiveInsert) };
    } else {
      return item;
    }
  };

  return state.map(recursiveInsert);
};

const insertPaginatedTree = (targetId, nodes, pageInfo) => state => {
  if (!targetId) {
    return {
      pageInfo,
      nodes: [...state.nodes, ...nodes]
    };
  }

  const recursiveInsert = item => {
    if (item.id === targetId) {
      return {
        ...item,
        nodes: [...item.nodes, ...nodes],
        pageInfo
      };
    } else if (item.nodes) {
      return { ...item, nodes: item.nodes.map(recursiveInsert) };
    } else {
      return item;
    }
  };

  return {
    pageInfo: state.pageInfo,
    nodes: state.nodes.map(recursiveInsert)
  };
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
      const nodes = await getIterativeTree(params);

      setList(insertTree(params.id, nodes));
    }, []);

    React.useEffect(() => {
      doGet({});
    }, [doGet]);

    const handleTableStateChange = React.useCallback(
      (type, tableState, action) => {
        console.log(type, tableState, action);

        const SERVER_SIDE_OPERATIONS = ['tree'];

        let params = {};

        if (action.type === 'ADD_TREE_EXPAND_BY_ID') {
          params = {
            id: action.payload.id
          };
        }

        if (
          SERVER_SIDE_OPERATIONS.includes(type) &&
          needsToFetch(tableState.data.nodes, params.id)
        ) {
          doGet(params);
        }
      },
      [doGet]
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
      const nodes = await getIterativeTree(params);

      setList(insertTree(params.id, nodes));
    }, []);

    React.useEffect(() => {
      doGet({});
    }, [doGet]);

    const handleTableStateChange = React.useCallback(
      (type, tableState, action) => {
        console.log(type, tableState, action);

        const SERVER_SIDE_OPERATIONS = ['tree'];

        let params = {};

        if (action.type === 'ADD_TREE_EXPAND_BY_ID') {
          params = {
            id: action.payload.id
          };
        }

        if (
          SERVER_SIDE_OPERATIONS.includes(type) &&
          needsToFetch(tableState.data.nodes, params.id)
        ) {
          doGet(params);
        }
      },
      [doGet]
    );

    const LoadingPanel = (
      tableItem,
      { treeDepthLevel, treeColumnLevel }
    ) => (
      <div style={{ marginLeft: `${8 + treeDepthLevel * 20}px` }}>
        Loading ...
      </div>
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
                  plugins={[
                    {
                      plugin: useTreeRow,
                      options: {
                        panelShowCondition: tableItem =>
                          tableItem.hasContent &&
                          !tableItem.nodes.length,
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
  })
  .add('fetch iterative (paginated)', () => {
    const [data, setData] = React.useState({
      nodes: [],
      pageInfo: null
    });

    const doGet = React.useCallback(async params => {
      const { nodes, pageInfo } = await getPaginatedTree(params);

      setData(insertPaginatedTree(params.id, nodes, pageInfo));
    }, []);

    React.useEffect(() => {
      doGet({
        offset: 0,
        limit: 1
      });
    }, [doGet]);

    const handleTableStateChange = React.useCallback(
      (type, tableState, action) => {
        console.log(type, tableState, action);

        const SERVER_SIDE_OPERATIONS = ['tree'];

        let params = {};

        if (action.type === 'ADD_TREE_EXPAND_BY_ID') {
          params = {
            id: action.payload.id,
            offset: 0,
            limit: 1
          };
        }

        if (
          SERVER_SIDE_OPERATIONS.includes(type) &&
          needsToFetch(tableState.data.nodes, params.id)
        ) {
          doGet(params);
        }
      },
      [doGet]
    );

    const handleLoadMore = React.useCallback(
      async (tableState, tableItem) => {
        console.log(tableState, tableItem);

        let params = {
          id: tableItem.id,
          offset: tableItem.pageInfo.nextOffset,
          limit: 2
        };

        return doGet(params);
      },
      [data]
    );

    const LoadingPanel = (
      tableItem,
      { treeDepthLevel, treeColumnLevel }
    ) => (
      <div style={{ marginLeft: `${8 + treeDepthLevel * 20}px` }}>
        Loading ...
      </div>
    );

    const IdlePanel = (
      tableItem,
      { treeDepthLevel, treeColumnLevel }
    ) => (
      <button
        style={{ marginLeft: `${8 + treeDepthLevel * 20}px` }}
        onClick={handleLoadMore}
      >
        More ...
      </button>
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
