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

import { nodes } from '../data';

storiesOf('Kitchen Sink/Expand', module)
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
  .add('animation', () => {
    const DURATION = 500;

    const data = { nodes };

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

    const computeHeights = (ids) =>
      ids.reduce((acc, id) => ({ ...acc, [id]: 'auto' }), {});

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
                    >
                      <strong>{item.name.toUpperCase()}</strong>
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
