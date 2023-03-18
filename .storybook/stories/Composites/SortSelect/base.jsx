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
import { useTheme } from '@table-library/react-table-library/theme';
import { useSort, HeaderCellSort } from '@table-library/react-table-library/sort';
import {
  HeaderCellSelect,
  CellSelect,
  useRowSelect,
} from '@table-library/react-table-library/select';

import { nodes } from '../../data';

const Component = () => {
  const data = { nodes };

  const theme = useTheme({
    Table: `
        --data-table-library_grid-template-columns:  24px repeat(5, minmax(0, 1fr));
      `,
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
    },
  );

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onSortChange(action, state) {
    console.log(action, state);
  }

  function onSelectChange(action, state) {
    console.log(action, state);
  }

  return (
    <Table data={data} theme={theme} layout={{ custom: true }} sort={sort} select={select}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCellSelect />
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
                <CellSelect item={item} />
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
