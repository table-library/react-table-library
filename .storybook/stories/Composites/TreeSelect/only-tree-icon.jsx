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
import { useTheme } from '@overmap-ai/react-table-library/theme';
import { CellTree, useTree, TreeExpandClickTypes } from '@overmap-ai/react-table-library/tree';
import {
  CellSelect,
  HeaderCellSelect,
  useRowSelect,
  SelectClickTypes,
} from '@overmap-ai/react-table-library/select';

import { nodes } from '../../data';

const Component = () => {
  const data = { nodes };

  const tree = useTree(
    data,
    {
      onChange: onTreeChange,
    },
    {
      clickType: TreeExpandClickTypes.ButtonClick,
    },
  );

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onTreeChange(action, state) {
    console.log(action, state);
  }

  function onSelectChange(action, state) {
    console.log(action, state);
  }

  return (
    <Table data={data} tree={tree} select={select}>
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
