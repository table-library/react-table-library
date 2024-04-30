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
import { useTheme } from '@overmap-ai/react-table-library/theme';

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

  const [search, setSearch] = React.useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // server

  const timeout = React.useRef();

  useCustom('search', data, {
    state: { search },
    onChange: onSearchChange,
  });

  function onSearchChange(action, state) {
    const params = {
      search,
    };

    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => doGet(params), 500);
  }

  // client

  const theme = useTheme({
    Cell: `
        & .match {
            font-weight: bold;
            color: #212121;
          }
      `,
  });

  const highlight = (needle, haystack) =>
    haystack.replace(new RegExp(needle, 'gi'), (str) => `<span class="match">${str}</span>`);

  return (
    <>
      <label htmlFor="search">
        Search by Task:&nbsp;
        <input id="search" type="text" onChange={handleSearch} />
      </label>
      <br />

      <Table data={data} theme={theme}>
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
                  <Cell>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: highlight(search, item.name),
                      }}
                    />
                  </Cell>
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
