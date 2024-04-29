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
import { findNodeById, recursiveMergeInsert } from '@overmap-ai/react-table-library/common/util';

import { getData } from '../../../server';

const needsToFetch = (nodes, id) => {
  const item = findNodeById(nodes, id);

  return item && item._hasContent && item.nodes && !item.nodes.length;
};

// TODO pageInfo -> ...rest // same in Server/Tree
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

  const [ids, setIds] = React.useState([]);

  const handleExpand = async (item) => {
    if (!item.nodes) return;

    if (ids.includes(item.id)) {
      setIds(ids.filter((id) => id !== item.id));
    } else {
      setIds(ids.concat(item.id));

      if (!needsToFetch(data.nodes, item.id)) return;

      const params = {
        id: item.id,
        isShallow: true,
      };

      doGet(params);
    }
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
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <React.Fragment key={item.id}>
                <Row item={item} onClick={handleExpand}>
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
                </Row>

                {ids.includes(item.id) && (
                  <tr style={{ display: 'flex', gridColumn: '1 / -1' }}>
                    <td style={{ flex: '1' }}>
                      <div
                        style={{
                          borderTop: '1px solid #a0a8ae',
                          borderBottom: '1px solid #a0a8ae',
                        }}
                      >
                        <strong>Tasks: {item.nodes.length}</strong>
                        <ul
                          style={{
                            margin: '0',
                            padding: '0',
                          }}
                        >
                          {item.nodes.map((node) => (
                            <li key={node.id}>{node.name}</li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default Component;
