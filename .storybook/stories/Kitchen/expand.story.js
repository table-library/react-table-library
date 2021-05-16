/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
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
import { createPanel } from '@table-library/react-table-library/panel';

import { nodes } from '../data';

storiesOf('Kitchen Sink/Expand', module)
  .addParameters({ component: Table })
  .add('animation', () => {
    const DURATION = 500;

    const data = { nodes };

    const [ids, setIds] = React.useState([]);
    const [heights, setHeights] = React.useState([]);

    const expansionPanel = createPanel({
      panel: (item) => (
        <AnimateHeight
          duration={DURATION}
          height={heights[item.id] || 0}
        >
          <strong>{item.name.toUpperCase()}</strong>
        </AnimateHeight>
      ),
      condition: (item) => ids.includes(item.id),
    });

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

    const computeHeights = (ids) =>
      ids.reduce((acc, id) => ({ ...acc, [id]: 'auto' }), {});

    return (
      <Table data={data} panels={[expansionPanel]}>
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
                <Row key={item.id} item={item} onClick={handleExpand}>
                  {(tableItem) => (
                    <>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'en-US',
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
                    </>
                  )}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });
