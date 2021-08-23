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
  Cell,
} from '@table-library/react-table-library/table';

import {
  useTree,
  CellTree,
} from '@table-library/react-table-library/tree';
import { createPanel } from '@table-library/react-table-library/panel';
import {
  findNodeById,
  recursiveMergeInsert,
} from '@table-library/react-table-library/common/util';

import { getData } from '../../server';

const needsToFetch = (nodes, id) => {
  const item = findNodeById(nodes, id);

  return item && item._hasContent && item.nodes && !item.nodes.length;
};

// TODO pageInfo -> ...rest
const insertTree = (targetId, nodes, pageInfo) => (state) => {
  if (!targetId) {
    return {
      pageInfo,
      nodes: [...state.nodes, ...nodes],
    };
  }

  return {
    pageInfo: state.pageInfo,
    nodes: state.nodes.map(
      recursiveMergeInsert(targetId, nodes, { pageInfo })
    ),
  };
};

storiesOf('Server/Tree', module)
  .addParameters({ component: Table })
  .add('fetch once', () => {
    const [data, setData] = React.useState({
      nodes: [],
    });

    const doGet = React.useCallback(async (params) => {
      setData(await getData(params));
    }, []);

    React.useEffect(() => {
      doGet({});
    }, [doGet]);

    // features

    const tree = useTree(data, {
      onChange: onTreeChange,
    });

    function onTreeChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} tree={tree}>
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
                <Row key={item.id} item={item}>
                  <CellTree item={item}>{item.name}</CellTree>
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
    );
  })
  .add('fetch nested', () => {
    const [data, setData] = React.useState({
      nodes: [],
    });

    const doGet = React.useCallback(async (params) => {
      const { nodes } = await getData(params);

      setData(insertTree(params.id, nodes));
    }, []);

    React.useEffect(() => {
      doGet({
        isShallow: true,
      });
    }, [doGet]);

    // features

    const tree = useTree(data, {
      onChange: onTreeChange,
    });

    function onTreeChange(action, state) {
      if (action.type !== 'ADD_BY_ID') return;
      if (!needsToFetch(data.nodes, action.payload.id)) return;

      const params = {
        id: action.payload.id,
        isShallow: true,
      };

      doGet(params);
    }

    return (
      <Table data={data} tree={tree}>
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
                <Row key={item.id} item={item}>
                  <CellTree item={item}>{item.name}</CellTree>
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
    );
  })
  .add('fetch nested (loading)', () => {
    const [data, setData] = React.useState({
      nodes: [],
    });

    const doGet = React.useCallback(async (params) => {
      const { nodes } = await getData(params);

      setData(insertTree(params.id, nodes));
    }, []);

    React.useEffect(() => {
      doGet({
        isShallow: true,
      });
    }, [doGet]);

    // features

    const [loadingIds, setLoadingIds] = React.useState([]);

    const tree = useTree(data, {
      onChange: onTreeChange,
    });

    async function onTreeChange(action, state) {
      if (action.type !== 'ADD_BY_ID') return;
      if (!needsToFetch(data.nodes, action.payload.id)) return;

      const params = {
        id: action.payload.id,
        isShallow: true,
      };

      setLoadingIds(loadingIds.concat(action.payload.id));
      await doGet(params);
      setLoadingIds(
        loadingIds.filter((id) => id !== action.payload.id)
      );
    }

    const loadingPanel = createPanel({
      panel: (item, { treeXLevel }) => (
        <div style={{ marginLeft: `${8 + treeXLevel * 20}px` }}>
          Loading ...
        </div>
      ),
      condition: (item) => loadingIds.includes(item.id),
    });

    return (
      <Table data={data} tree={tree} panels={[loadingPanel]}>
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
                <Row key={item.id} item={item}>
                  <CellTree item={item}>{item.name}</CellTree>
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
    );
  })
  .add('fetch nested & paginated', () => {
    const [data, setData] = React.useState({
      nodes: [],
      pageInfo: null,
    });

    const doGet = React.useCallback(async (params) => {
      const { nodes, pageInfo } = await getData(params);

      setData(insertTree(params.id, nodes, pageInfo));
    }, []);

    React.useEffect(() => {
      doGet({
        offset: 0,
        limit: 2,
        isShallow: true,
      });
    }, [doGet]);

    // features

    const [loadingIds, setLoadingIds] = React.useState([]);

    const tree = useTree(data, {
      onChange: onTreeChange,
    });

    async function onTreeChange(action, state) {
      if (action.type !== 'ADD_BY_ID') return;
      if (!needsToFetch(data.nodes, action.payload.id)) return;

      const params = {
        offset: 0,
        limit: 2,
        id: action.payload.id,
        isShallow: true,
      };

      setLoadingIds(loadingIds.concat(action.payload.id));
      await doGet(params);
      setLoadingIds(
        loadingIds.filter((id) => id !== action.payload.id)
      );
    }

    const handleLoadMore = async (item, props, parentItem) => {
      setLoadingIds(loadingIds.concat(item.id));
      await doGet({
        offset: parentItem.pageInfo.nextOffset,
        limit: 2,
        id: parentItem.id,
        isShallow: true,
      });
      setLoadingIds(loadingIds.filter((id) => id !== item.id));
    };

    const fetchPanel = createPanel({
      panel: (item, props, parentItem) => (
        <div>
          <button
            type="button"
            onClick={() => handleLoadMore(item, props, parentItem)}
          >
            Load More ...
          </button>
        </div>
      ),
      condition: (item, props, parentItem) =>
        !loadingIds.includes(item.id) &&
        parentItem &&
        parentItem.pageInfo &&
        parentItem.pageInfo.nextOffset < parentItem.pageInfo.total &&
        parentItem.nodes[parentItem.nodes.length - 1].id === item.id,
    });

    const loadingPanel = createPanel({
      panel: (item, { treeXLevel }) => (
        <div style={{ marginLeft: `${8 + treeXLevel * 20}px` }}>
          Loading ...
        </div>
      ),
      condition: (item) => loadingIds.includes(item.id),
    });

    return (
      <Table
        data={data}
        tree={tree}
        panels={[loadingPanel, fetchPanel]}
      >
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
                <Row key={item.id} item={item}>
                  <CellTree item={item}>{item.name}</CellTree>
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
    );
  });
