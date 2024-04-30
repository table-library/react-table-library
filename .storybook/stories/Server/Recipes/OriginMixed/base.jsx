import * as React from 'react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
  useCustom,
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

  // features: state

  const [search, setSearch] = React.useState('');

  useCustom('search', data, {
    state: { search },
    onChange: onSearchChange,
  });

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      isServer: true,
    },
  );

  function onSearchChange(action, state) {
    const params = {
      search: state.search,
      sort: {
        sortKey: sort.state.sortKey,
        reverse: sort.state.reverse,
      },
    };

    doGet(params);
  }

  function onSortChange(action, state) {
    const params = {
      search,
      sort: {
        sortKey: state.sortKey,
        reverse: state.reverse,
      },
    };

    doGet(params);
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <label htmlFor="search">
        Search by Task:&nbsp;
        <input id="search" type="text" onChange={handleSearch} />
      </label>
      <br />

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
    </>
  );
};

export default Component;
