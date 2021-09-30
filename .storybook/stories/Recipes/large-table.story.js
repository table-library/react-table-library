/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import { nodes } from '../data';

const manyNodes = [...Array(1000)]
  .map((_, i) => nodes.map((node) => ({ ...node, id: node.id + i })))
  .flat();

storiesOf('Recipes/Large Tables', module)
  .addParameters({ component: Table })
  .add('documentation', () => (
    <ul>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
    </ul>
  ))
  .add('large list/tree', () => {
    const data = { nodes: manyNodes };

    return (
      <Table data={data}>
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

            <AutoSizer>
              {({ width }) => (
                <FixedSizeList
                  height={300}
                  itemCount={data.nodes.length}
                  itemSize={29}
                  width={width}
                  itemData={{ items: tableList }}
                >
                  {({ index, style, data }) => (
                    <div style={style}>
                      <Row item={data.items[index]}>
                        <Cell>{data.items[index].name}</Cell>
                        <Cell>
                          {data.items[
                            index
                          ].deadline.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })}
                        </Cell>
                        <Cell>{data.items[index].type}</Cell>
                        <Cell>
                          {data.items[index].isComplete.toString()}
                        </Cell>
                        <Cell>{data.items[index].nodes?.length}</Cell>
                      </Row>
                    </div>
                  )}
                </FixedSizeList>
              )}
            </AutoSizer>
          </>
        )}
      </Table>
    );
  });
