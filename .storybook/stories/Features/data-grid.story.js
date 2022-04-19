import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import useInterval from 'use-interval';

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

import { DisableAnimationsContext } from '../../stories/loki.js';
import { lotsOfNodes, randomFromInterval } from '../data';
import { valueToColor } from '../util';

const ROW_HEIGHT = 30;

const WithStickyHeader = React.forwardRef(({ children, ...rest }, ref) => (
  <div ref={ref} {...rest}>
    <Header>
      <HeaderRow>
        <HeaderCell pinLeft>A</HeaderCell>
        <HeaderCell pinLeft>B</HeaderCell>
        <HeaderCell>C</HeaderCell>
        <HeaderCell>D</HeaderCell>
        <HeaderCell>E</HeaderCell>
        <HeaderCell>F</HeaderCell>
        <HeaderCell>G</HeaderCell>
        <HeaderCell>H</HeaderCell>
        <HeaderCell>I</HeaderCell>
        <HeaderCell>J</HeaderCell>
      </HeaderRow>
    </Header>

    <Body>{children}</Body>
  </div>
));

storiesOf('Features/Data Grid', module)
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
  .add('one million cells', () => {
    const [nodes, setNodes] = React.useState(lotsOfNodes);

    const theme = useTheme({
      Table: `
        height: 100%;
      `,
      BaseCell: `
        color: #000000;

        min-width: 15%;
        width: 15%;

        &:nth-of-type(1) {
          left: 0px;
        }

        &:nth-of-type(2) {
          left: 15%;
        }
      `,
    });

    //* Ambiguous Update Interval *//

    const disableAnimations = React.useContext(DisableAnimationsContext);
    const updateRandomCell = React.useCallback((node) => {
      const keys = Object.keys(node);
      const randomKey = keys[randomFromInterval(0, keys.length - 1)];

      const prefix = node[randomKey].substring(0, node[randomKey].indexOf(':') + 1);

      return { [randomKey]: `${prefix} ${randomFromInterval(-100, 100)}` };
    }, []);

    useInterval(() => {
      if (disableAnimations) return;

      setNodes((v) => v.map((node) => ({ ...node, ...updateRandomCell(node) })));
    }, 250);

    const data = { nodes };

    return (
      <div style={{ height: '300px' }}>
        <Table data={data} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
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
                        <Cell
                          style={{ backgroundColor: valueToColor(data.items[index].cellA) }}
                          pinLeft
                        >
                          {data.items[index].cellA}
                        </Cell>
                        <Cell
                          style={{ backgroundColor: valueToColor(data.items[index].cellB) }}
                          pinLeft
                        >
                          {data.items[index].cellB}
                        </Cell>
                        <Cell style={{ backgroundColor: valueToColor(data.items[index].cellC) }}>
                          {data.items[index].cellC}
                        </Cell>
                        <Cell style={{ backgroundColor: valueToColor(data.items[index].cellD) }}>
                          {data.items[index].cellD}
                        </Cell>
                        <Cell style={{ backgroundColor: valueToColor(data.items[index].cellE) }}>
                          {data.items[index].cellE}
                        </Cell>
                        <Cell style={{ backgroundColor: valueToColor(data.items[index].cellF) }}>
                          {data.items[index].cellF}
                        </Cell>
                        <Cell style={{ backgroundColor: valueToColor(data.items[index].cellG) }}>
                          {data.items[index].cellG}
                        </Cell>
                        <Cell style={{ backgroundColor: valueToColor(data.items[index].cellH) }}>
                          {data.items[index].cellH}
                        </Cell>
                        <Cell style={{ backgroundColor: valueToColor(data.items[index].cellI) }}>
                          {data.items[index].cellI}
                        </Cell>
                        <Cell style={{ backgroundColor: valueToColor(data.items[index].cellJ) }}>
                          {data.items[index].cellJ}
                        </Cell>
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
  });
