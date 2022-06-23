import * as React from 'react';
import { storiesOf } from '@storybook/react';
import AnimateHeight from 'react-animate-height';

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

import { nodes } from '../data';

storiesOf('Kitchen Sink/Expand', module)
  .addParameters({ component: Table })
  .add('animation', () => {
    const DURATION = 500;

    const data = { nodes };

    const theme = useTheme({
      Table: `
        .animate {
          grid-column: 1 / -1;

          display: flex;
        }

        .animate > div {
          flex: 1;
          display: flex;
        }
      `,
    });

    const [ids, setIds] = React.useState([]);
    const [heights, setHeights] = React.useState([]);

    const handleExpand = (item) => {
      if (ids.includes(item.id)) {
        const expandedIds = ids.filter((id) => id !== item.id);
        setHeights(computeHeights(expandedIds));
        setTimeout(() => setIds(expandedIds), DURATION);
      } else {
        setIds(ids.concat(item.id));
      }
    };

    React.useEffect(() => {
      setHeights(computeHeights(ids));
    }, [ids]);

    const computeHeights = (ids) => ids.reduce((acc, id) => ({ ...acc, [id]: 78 }), {});

    return (
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
                <React.Fragment key={item.id}>
                  <Row item={item} onClick={handleExpand}>
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

                  {ids.includes(item.id) && (
                    <AnimateHeight
                      duration={DURATION}
                      height={heights[item.id] || 0}
                      className="animate"
                    >
                      <tr style={{ flex: '1', display: 'flex' }}>
                        <td style={{ flex: '1' }}>
                          <ul
                            style={{
                              margin: '0',
                              padding: '0',
                              backgroundColor: '#e0e0e0',
                            }}
                          >
                            <li>
                              <strong>Name:</strong> {item.name.toUpperCase()}
                            </li>
                            <li>
                              <strong>Deadline:</strong> {item.deadline.toLocaleDateString('en-US')}
                            </li>
                            <li>
                              <strong>Type:</strong> {item.type}
                            </li>
                            <li>
                              <strong>Complete:</strong> {item.isComplete.toString()}
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </AnimateHeight>
                  )}
                </React.Fragment>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });
