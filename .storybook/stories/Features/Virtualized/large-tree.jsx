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
import { Virtualized } from '@overmap-ai/react-table-library/virtualized';

import { useTree, CellTree } from '@overmap-ai/react-table-library/tree';

import { manyNodes } from '../../data';

const ROW_HEIGHT = 19;

const Component = () => {
  const data = { nodes: manyNodes };

  const tree = useTree(
    data,
    {
      onChange: onTreeChange,
    },
    {
      treeYLevel: 1,
    },
  );

  function onTreeChange(action, state) {
    console.log(action, state);
  }

  return (
    /* see Features/Fixed Header for flexbox instead of height container */
    <div style={{ height: '300px' }}>
      <Table data={data} layout={{ isDiv: true, fixedHeader: true }} tree={tree}>
        {(tableList) => (
          <Virtualized
            tableList={tableList}
            rowHeight={ROW_HEIGHT}
            header={() => (
              <HeaderRow>
                <HeaderCell stiff>Index</HeaderCell>
                <HeaderCell>Task</HeaderCell>
                <HeaderCell>Deadline</HeaderCell>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Complete</HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            )}
            body={(item, index) => (
              <Row item={item}>
                <Cell stiff>{index}</Cell>
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
            )}
          />
        )}
      </Table>
    </div>
  );
};

export default Component;
