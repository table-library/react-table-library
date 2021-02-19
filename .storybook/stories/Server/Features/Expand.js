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
  Cell
} from '@table-library/react-table-library/lib/table';
import { createPanel } from '@table-library/react-table-library/lib/panel';
import {
  findNodeById,
  recursiveMergeInsert
} from '@table-library/react-table-library/lib/common/util';

import { getData } from '../../server';

const needsToFetch = (nodes, id) => {
  const item = findNodeById(nodes, id);

  return item && item._hasContent && item.nodes && !item.nodes.length;
};

// TODO pageInfo -> ...rest // same in Server/Tree
const insertTree = (targetId, nodes, pageInfo) => state => {
  if (!targetId) {
    return {
      pageInfo,
      nodes: [...state.nodes, ...nodes]
    };
  }

  return {
    pageInfo: state.pageInfo,
    nodes: state.nodes.map(
      recursiveMergeInsert(targetId, nodes, { pageInfo })
    )
  };
};

storiesOf('07. Server/ 06. Expand', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const [data, setData] = React.useState({
      nodes: []
    });

    const doGet = React.useCallback(async params => {
      const { nodes } = await getData(params);

      setData(insertTree(params.id, nodes));
    }, []);

    React.useEffect(() => {
      doGet({
        isShallow: true
      });
    }, [doGet]);

    // features

    const [ids, setIds] = React.useState([]);

    const expansionPanel = createPanel({
      panel: item => <strong>{JSON.stringify(item.nodes)}</strong>,
      condition: item => ids.includes(item.id)
    });

    const handleExpand = async item => {
      if (ids.includes(item.id)) {
        setIds(ids.filter(id => id !== item.id));
      } else {
        setIds(ids.concat(item.id));

        if (!needsToFetch(data.nodes, item.id)) return;

        const params = {
          id: item.id,
          isShallow: true
        };

        doGet(params);
      }
    };

    return (
      <Table data={data} panels={[expansionPanel]}>
        {tableList => (
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
              {tableList.map(item => (
                <Row key={item.id} item={item} onClick={handleExpand}>
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'fr-CA',
                          {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                          }
                        )}
                      </Cell>
                      <Cell>{tableItem.type}</Cell>
                      <Cell>{tableItem.isComplete.toString()}</Cell>
                      <Cell>{tableItem.nodes?.length}</Cell>
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
