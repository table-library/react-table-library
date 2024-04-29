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
import { useTree } from '@overmap-ai/react-table-library/tree';
import { useSort, HeaderCellSort } from '@overmap-ai/react-table-library/sort';

import { nodes } from '../../data';

const Component = () => {
  const data = { nodes };

  const tree = useTree(data, {
    onChange: onTreeChange,
  });

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
        TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
        TASKS: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
      isRecursive: false,
    },
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  function onTreeChange(action, state) {
    console.log(action, state);
  }

  return (
    <Table data={data} tree={tree} sort={sort}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCellSort sortKey="TASK">Task</HeaderCellSort>
              <HeaderCellSort sortKey="DEADLINE">Deadline</HeaderCellSort>
              <HeaderCellSort sortKey="TYPE">Type</HeaderCellSort>
              <HeaderCellSort sortKey="COMPLETE">Complete</HeaderCellSort>
              <HeaderCellSort sortKey="TASKS">Tasks</HeaderCellSort>
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
  );
};

export default Component;
