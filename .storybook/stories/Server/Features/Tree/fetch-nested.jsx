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
import { useTree, CellTree } from '@table-library/react-table-library/tree';
import { findNodeById, recursiveMergeInsert } from '@table-library/react-table-library/common/util';

import { getData } from '../../../server';

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
    nodes: state.nodes.map(recursiveMergeInsert(targetId, nodes, { pageInfo })),
  };
};

const Component = () => {
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
};

export default Component;
