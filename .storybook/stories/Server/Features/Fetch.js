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
  Cell,
} from '@table-library/react-table-library/table';
import { createPanel } from '@table-library/react-table-library/panel';

import { getData } from '../../server';

storiesOf('07. Server/ 09. Fetch', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const [data, setData] = React.useState({
      nodes: [],
      pageInfo: null,
    });

    const doGet = React.useCallback(async (params) => {
      const { nodes, pageInfo } = await getData(params);

      setData((state) => ({
        pageInfo,
        nodes: [...state.nodes, ...nodes],
      }));
    }, []);

    React.useEffect(() => {
      doGet({ offset: 0, limit: 2 });
    }, [doGet]);

    // features

    const handleLoadMore = (item) => {
      doGet({ offset: item.pageInfo.nextOffset, limit: 2 });
    };

    console.log(data);

    const fetchPanel = createPanel({
      panel: (item) => (
        <div>
          <button type="button" onClick={() => handleLoadMore(item)}>
            Load More ...
          </button>
        </div>
      ),
      condition: (item) =>
        data.pageInfo &&
        data.pageInfo.nextOffset < data.pageInfo.total &&
        data.nodes[data.nodes.length - 1].id === item.id,
    });

    return (
      <Table data={data} panels={[fetchPanel]}>
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
                  {(tableItem) => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'fr-CA',
                          {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
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
  })
  .add('with loading', () => {
    const [data, setData] = React.useState({
      nodes: [],
      pageInfo: null,
    });

    const doGet = React.useCallback(async (params) => {
      const { nodes, pageInfo } = await getData(params);

      setData((state) => ({
        pageInfo,
        nodes: [...state.nodes, ...nodes],
      }));
    }, []);

    React.useEffect(() => {
      doGet({ offset: 0, limit: 2 });
    }, [doGet]);

    // features

    const [loadingIds, setLoadingIds] = React.useState([]);

    const handleLoadMore = async (item) => {
      setLoadingIds(loadingIds.concat(item.id));

      await doGet({ offset: item.pageInfo.nextOffset, limit: 2 });

      setLoadingIds(loadingIds.filter((id) => id !== item.id));
    };

    const fetchPanel = createPanel({
      panel: (item) => (
        <div>
          <button type="button" onClick={() => handleLoadMore(item)}>
            Load More ...
          </button>
        </div>
      ),
      condition: (item) =>
        data.pageInfo.nextOffset < data.pageInfo.total &&
        data.nodes[data.nodes.length - 1].id === item.id &&
        !loadingIds.includes(item.id),
    });

    const loadingPanel = createPanel({
      panel: () => <div>Loading ...</div>,
      condition: (item) => loadingIds.includes(item.id),
    });

    return (
      <Table data={data} panels={[fetchPanel, loadingPanel]}>
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
                  {(tableItem) => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'fr-CA',
                          {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
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
