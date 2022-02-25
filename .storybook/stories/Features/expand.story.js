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

import { nodes } from '../data';

storiesOf('Features/Expand', module)
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
  .add('base', () => {
    const data = { nodes };

    const [ids, setIds] = React.useState([]);

    const handleExpand = (item) => {
      if (ids.includes(item.id)) {
        setIds(ids.filter((id) => id !== item.id));
      } else {
        setIds(ids.concat(item.id));
      }
    };

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
                  )}
                </React.Fragment>
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

                  {ids.includes(item.id) && <strong>{item.name.toUpperCase()}</strong>}
                </React.Fragment>
              ))}
            </Body>
          </>
        )}
      </Table>
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
