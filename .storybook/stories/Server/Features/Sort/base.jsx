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

import { getData } from '../../../server';

const Component = () => {
  const [data, setData] = React.useState({
    nodes: [],
  });

  // initial fetching

  const doGet = React.useCallback(async (params) => {
    setData(await getData(params));
  }, []);

  React.useEffect(() => {
    doGet({});
  }, [doGet]);

  // features

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      isServer: true,
    },
  );

  function onSortChange(action, state) {
    const params = {
      sort: {
        sortKey: state.sortKey,
        reverse: state.reverse,
      },
    };

    doGet(params);
  }

  return (
    <Table data={data} sort={sort}>
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
              <Row key={item.id} item={item}>
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
