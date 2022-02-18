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
import { useTheme } from '@table-library/react-table-library/theme';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import useInterval from 'use-interval';

import { lotsOfNodes, randomFromInterval } from '../data';

const ROW_HEIGHT = 30;

const valueToColor = (value) => {
  let perc = value.substring(value.indexOf(':') + 1);

  const min = -100;
  const max = 100;
  const base = max - min;

  if (base == 0) {
    perc = 100;
  } else {
    perc = ((perc - min) / base) * 100;
  }
  let r,
    g,
    b = 0;
  if (perc < 50) {
    r = 255;
    g = Math.round(5.1 * perc);
  } else {
    g = 255;
    r = Math.round(510 - 5.1 * perc);
  }
  const h = r * 0x10000 + g * 0x100 + b * 0x1;
  return '#' + ('000000' + h.toString(16)).slice(-6);
};

const WithStickyHeader = React.forwardRef(({ children, ...rest }, ref) => (
  <div ref={ref} {...rest}>
    <Header>
      <HeaderRow>
        <HeaderCell pin>A</HeaderCell>
        <HeaderCell pin>B</HeaderCell>
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
  .addParameters({ component: Table })
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

        &:nth-child(1) {
          left: 0px;
        }

        &:nth-child(2) {
          left: 15%;
        }
      `,
    });

    //* Ambiguous Update Interval *//

    const updateRandomCell = React.useCallback((node) => {
      const keys = Object.keys(node);
      const randomKey = keys[randomFromInterval(0, keys.length - 1)];

      const prefix = node[randomKey].substring(0, node[randomKey].indexOf(':') + 1);

      return { [randomKey]: `${prefix} ${randomFromInterval(-100, 100)}` };
    }, []);

    useInterval(() => {
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
                          pin
                        >
                          {data.items[index].cellA}
                        </Cell>
                        <Cell
                          style={{ backgroundColor: valueToColor(data.items[index].cellB) }}
                          pin
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
