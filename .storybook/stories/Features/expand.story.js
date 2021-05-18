/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import {
  useCustom,
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

storiesOf('Features/Expand', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const data = { nodes };

    const [ids, setIds] = React.useState([]);

    const expansionPanel = createPanel({
      panel: (item) => <strong>{item.name.toUpperCase()}</strong>,
      condition: (item) => ids.includes(item.id),
    });

    const handleExpand = (item) => {
      if (ids.includes(item.id)) {
        setIds(ids.filter((id) => id !== item.id));
      } else {
        setIds(ids.concat(item.id));
      }
    };

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
  })
  .add('with callback', () => {
    const data = { nodes };

    const [ids, setIds] = React.useState([]);

    const expansionPanel = createPanel({
      panel: (item) => <strong>{item.name.toUpperCase()}</strong>,
      condition: (item) => ids.includes(item.id),
    });

    const handleExpand = (item) => {
      if (ids.includes(item.id)) {
        setIds(ids.filter((id) => id !== item.id));
      } else {
        setIds(ids.concat(item.id));
      }
    };

    useCustom('expand', data, {
      state: { ids },
      onChange: onExpandChange,
    });

    function onExpandChange(action, state) {
      console.log(action, state);
    }

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
