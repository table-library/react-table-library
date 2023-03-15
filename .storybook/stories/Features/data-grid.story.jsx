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
import { Virtualized } from '@table-library/react-table-library/virtualized';
import { useTheme } from '@table-library/react-table-library/theme';

import { DisableAnimationsContext } from '../../stories/loki.jsx';
import { lotsOfNodes, randomFromInterval } from '../data';
import { valueToColor } from '../util';

const ROW_HEIGHT = 19;

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
        --data-table-library_grid-template-columns:  repeat(10, minmax(150px, 1fr));
      `,
      BaseCell: `
        color: #000000;

        &:nth-of-type(1) {
          left: 0px;
        }

        &:nth-of-type(2) {
          left: 150px;
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
        <Table
          data={data}
          theme={theme}
          layout={{ custom: true, horizontalScroll: true, fixedHeader: true }}
        >
          {(tableList) => (
            <Virtualized
              tableList={tableList}
              rowHeight={ROW_HEIGHT}
              header={() => (
                <HeaderRow>
                  <HeaderCell resize pinLeft>
                    A
                  </HeaderCell>
                  <HeaderCell resize pinLeft>
                    B
                  </HeaderCell>
                  <HeaderCell resize>C</HeaderCell>
                  <HeaderCell resize>D</HeaderCell>
                  <HeaderCell resize>E</HeaderCell>
                  <HeaderCell resize>F</HeaderCell>
                  <HeaderCell resize>G</HeaderCell>
                  <HeaderCell resize>H</HeaderCell>
                  <HeaderCell resize>I</HeaderCell>
                  <HeaderCell resize>J</HeaderCell>
                </HeaderRow>
              )}
              body={(item, index) => (
                <Row item={item}>
                  <Cell pinLeft style={{ backgroundColor: valueToColor(item.cellA) }}>
                    {item.cellA}
                  </Cell>
                  <Cell pinLeft style={{ backgroundColor: valueToColor(item.cellB) }}>
                    {item.cellB}
                  </Cell>
                  <Cell style={{ backgroundColor: valueToColor(item.cellC) }}>{item.cellC}</Cell>
                  <Cell style={{ backgroundColor: valueToColor(item.cellD) }}>{item.cellD}</Cell>
                  <Cell style={{ backgroundColor: valueToColor(item.cellE) }}>{item.cellE}</Cell>
                  <Cell style={{ backgroundColor: valueToColor(item.cellF) }}>{item.cellF}</Cell>
                  <Cell style={{ backgroundColor: valueToColor(item.cellG) }}>{item.cellG}</Cell>
                  <Cell style={{ backgroundColor: valueToColor(item.cellH) }}>{item.cellH}</Cell>
                  <Cell style={{ backgroundColor: valueToColor(item.cellI) }}>{item.cellI}</Cell>
                  <Cell style={{ backgroundColor: valueToColor(item.cellJ) }}>{item.cellJ}</Cell>
                </Row>
              )}
            />
          )}
        </Table>
      </div>
    );
  });
