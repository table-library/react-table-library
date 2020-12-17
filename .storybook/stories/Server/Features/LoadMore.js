/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
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

import { useFetch } from '@table-library/react-table-library/lib/fetch';

import { get } from '../server/list';

storiesOf('06. Server/ 09. Load More', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const [data, setData] = React.useState({
      nodes: [],
      pageInfo: null
    });

    const doGet = React.useCallback(async params => {
      const { nodes, pageInfo } = await get(params);

      setData(state => ({
        pageInfo,
        nodes: [...state.nodes, ...nodes]
      }));
    }, []);

    React.useEffect(() => {
      doGet({ offset: 0, limit: 2 });
    }, [doGet]);

    const handleLoadMore = React.useCallback(
      async tablestate => {
        console.log(tablestate);

        let params = {
          ...params,
          offset: data.pageInfo.nextOffset,
          limit: 2
        };

        return doGet(params);
      },
      [data]
    );

    return (
      <Table list={data.nodes}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Stars</HeaderCell>
                <HeaderCell>Light</HeaderCell>
                <HeaderCell>Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row
                  key={item.id}
                  item={item}
                  plugins={[
                    {
                      plugin: useFetch,
                      options: {
                        showCondition: () =>
                          data.pageInfo.nextOffset <
                          data.pageInfo.total,
                        idlePanel: () => (
                          <button onClick={handleLoadMore}>
                            More ...
                          </button>
                        ),
                        loadingPanel: () => <div>Loading ...</div>
                      }
                    }
                  ]}
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>{tableItem.stars}</Cell>
                      <Cell>{tableItem.light.toString()}</Cell>
                      <Cell>{tableItem.count}</Cell>
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
