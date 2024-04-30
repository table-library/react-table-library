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
import { useSort, HeaderCellSort } from '@overmap-ai/react-table-library/sort';

import { nodes } from '../../data';

const Component = () => {
  const SORTS = {
    NONE: {
      label: 'None',
      sortKey: 'NONE',
      sortFn: (array) => array,
    },
    TASK: {
      label: 'Task',
      sortKey: 'TASK',
      sortFn: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
    },
    DEADLINE: {
      label: 'Deadline',
      sortKey: 'DEADLINE',
      sortFn: (array) => array.sort((a, b) => a.deadline - b.deadline),
    },
    TYPE: {
      label: 'Type',
      sortKey: 'TYPE',
      sortFn: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
    },
    COMPLETE: {
      label: 'Complete',
      sortKey: 'COMPLETE',
      sortFn: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
    },
    TASKS: {
      label: 'Tasks',
      sortKey: 'TASKS',
      sortFn: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
    },
  };

  const data = { nodes };

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        NONE: (array) => array,
        TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
        TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
        TASKS: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    },
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  return (
    <>
      <select
        value={sort.state.sortKey}
        onChange={(event) => sort.fns.onToggleSort(SORTS[event.target.value])}
      >
        {Object.keys(SORTS).map((key) => (
          <option key={key} value={SORTS[key].sortKey}>
            {SORTS[key].label}
          </option>
        ))}
      </select>

      <Table data={data} sort={sort}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                {Object.keys(SORTS)
                  .filter((key) => key !== 'NONE')
                  .map((key) => (
                    <HeaderCellSort key={key} sortKey={SORTS[key].sortKey}>
                      {SORTS[key].label}
                    </HeaderCellSort>
                  ))}
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
    </>
  );
};

export default Component;
