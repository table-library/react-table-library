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
import { useTheme } from '@table-library/react-table-library/theme';

import { useTree, CellTree } from '@table-library/react-table-library/tree';

import { manyNodes } from '../data';

const ROW_HEIGHT = 28;

const WithStickyHeader = React.forwardRef(({ children, ...rest }, ref) => (
  <div ref={ref} {...rest}>
    <Header>
      <HeaderRow>
        <HeaderCell stiff>Index</HeaderCell>
        <HeaderCell>Task</HeaderCell>
        <HeaderCell>Deadline</HeaderCell>
        <HeaderCell>Type</HeaderCell>
        <HeaderCell>Complete</HeaderCell>
        <HeaderCell>Tasks</HeaderCell>
      </HeaderRow>
    </Header>

    <Body>{children}</Body>
  </div>
));

storiesOf('Features/Ten Thousand Rows', module)
  .addParameters({
    component: Table,
    subcomponents: {
      Header,
      HeaderRow,
      Body,
      Row,
      HeaderCell,
      Cell,
    },
  })
  .add('large list', () => {
    const data = { nodes: manyNodes };

    const theme = useTheme({
      Table: `
        height: 100%;
      `,
    });

    return (
      /* see Features/Fixed Header for flexbox instead of height container */
      <div style={{ height: '300px' }}>
        <Table data={data} theme={theme}>
          {(tableList) => (
            <AutoSizer>
              {({ width, height }) => (
                <FixedSizeList
                  height={height}
                  width={width}
                  itemCount={data.nodes.length}
                  itemSize={ROW_HEIGHT}
                  innerElementType={WithStickyHeader}
                  itemData={{ items: tableList }}
                >
                  {({ index, style, data }) => (
                    <div
                      style={{
                        ...style,
                        top: style.top + ROW_HEIGHT,
                      }}
                    >
                      <Row item={data.items[index]}>
                        <Cell stiff>{index}</Cell>
                        <Cell>{data.items[index].name}</Cell>
                        <Cell>
                          {data.items[index].deadline.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })}
                        </Cell>
                        <Cell>{data.items[index].type}</Cell>
                        <Cell>{data.items[index].isComplete.toString()}</Cell>
                        <Cell>{data.items[index].nodes?.length}</Cell>
                      </Row>
                    </div>
                  )}
                </FixedSizeList>
              )}
            </AutoSizer>
          )}
        </Table>
      </div>
    );
  })
  .add('large tree', () => {
    const data = { nodes: manyNodes };

    const theme = useTheme({
      Table: `
        height: 100%;
      `,
    });

    const tree = useTree(
      data,
      {
        onChange: onTreeChange,
      },
      {
        treeYLevel: 1,
      },
    );

    function onTreeChange(action, state) {
      console.log(action, state);
    }

    return (
      /* see Features/Fixed Header for flexbox instead of height container */
      <div style={{ height: '300px' }}>
        <Table data={data} theme={theme} tree={tree}>
          {(tableList) => (
            <AutoSizer>
              {({ width, height }) => (
                <FixedSizeList
                  height={height}
                  width={width}
                  itemCount={data.nodes.length}
                  itemSize={ROW_HEIGHT}
                  innerElementType={WithStickyHeader}
                  itemData={{ items: tableList }}
                >
                  {({ index, style, data }) => (
                    <div
                      style={{
                        ...style,
                        top: style.top + ROW_HEIGHT,
                      }}
                    >
                      <Row item={data.items[index]}>
                        <Cell stiff>{index}</Cell>
                        <CellTree item={data.items[index]}>{data.items[index].name}</CellTree>
                        <Cell>
                          {data.items[index].deadline.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })}
                        </Cell>
                        <Cell>{data.items[index].type}</Cell>
                        <Cell>{data.items[index].isComplete.toString()}</Cell>
                        <Cell>{data.items[index].nodes?.length}</Cell>
                      </Row>
                    </div>
                  )}
                </FixedSizeList>
              )}
            </AutoSizer>
          )}
        </Table>
      </div>
    );
  })
  .add('documentation', () => (
    <ul>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
    </ul>
  ));
