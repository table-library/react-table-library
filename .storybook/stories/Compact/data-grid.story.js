/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import useInterval from 'use-interval';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';

import { DisableAnimationsContext } from '../../stories/loki.js';
import { lotsOfNodes, randomFromInterval } from '../data';
import { valueToColor } from '../util';

storiesOf('Compact/Data Grid', module)
  .addParameters({ component: CompactTable })
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

    const COLUMNS = [
      {
        label: 'A',
        renderCell: (item) => item.cellA,
        cellProps: {
          style: (item) => ({ backgroundColor: valueToColor(item.cellA) }),
        },
        pin: true,
      },
      {
        label: 'B',
        renderCell: (item) => item.cellB,
        cellProps: {
          style: (item) => ({ backgroundColor: valueToColor(item.cellB) }),
        },
        pin: true,
      },
      {
        label: 'C',
        renderCell: (item) => item.cellC,
        cellProps: {
          style: (item) => ({ backgroundColor: valueToColor(item.cellC) }),
        },
      },
      {
        label: 'D',
        renderCell: (item) => item.cellD,
        cellProps: {
          style: (item) => ({ backgroundColor: valueToColor(item.cellD) }),
        },
      },
      {
        label: 'E',
        renderCell: (item) => item.cellE,
        cellProps: {
          style: (item) => ({ backgroundColor: valueToColor(item.cellE) }),
        },
      },
      {
        label: 'F',
        renderCell: (item) => item.cellF,
        cellProps: {
          style: (item) => ({ backgroundColor: valueToColor(item.cellF) }),
        },
      },
      {
        label: 'G',
        renderCell: (item) => item.cellG,
        cellProps: {
          style: (item) => ({ backgroundColor: valueToColor(item.cellG) }),
        },
      },
      {
        label: 'H',
        renderCell: (item) => item.cellH,
        cellProps: {
          style: (item) => ({ backgroundColor: valueToColor(item.cellH) }),
        },
      },
      {
        label: 'I',
        renderCell: (item) => item.cellI,
        cellProps: {
          style: (item) => ({ backgroundColor: valueToColor(item.cellI) }),
        },
      },
      {
        label: 'J',
        renderCell: (item) => item.cellJ,
        cellProps: {
          style: (item) => ({ backgroundColor: valueToColor(item.cellJ) }),
        },
      },
    ];

    const VIRTUALIZED_OPTIONS = {
      rowHeight: (_item, _index) => 27,
    };

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
      <>
        <div style={{ height: '300px' }}>
          <CompactTable
            columns={COLUMNS}
            virtualizedOptions={VIRTUALIZED_OPTIONS}
            data={data}
            theme={theme}
            layout={{ custom: true, horizontalScroll: true }}
          />
        </div>

        <br />
        <small style={{ width: '100%' }}>
          For more configuration, see <strong>Features/Data Grid</strong> ...
        </small>
      </>
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
