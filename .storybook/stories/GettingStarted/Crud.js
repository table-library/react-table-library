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

import { nodes } from '../data';

storiesOf('Getting Started/CRUD', module)
  .addParameters({ component: Table })
  .add('create', () => {
    const [data, setData] = React.useState({ nodes });
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const handleSubmit = (event) => {
      const id = Math.floor(Math.random() * (9990 - 0 + 1)) + 0;

      setData((state) => ({
        ...state,
        nodes: state.nodes.concat({
          id,
          name: value,
          deadline: new Date(),
          type: 'LEARN',
          isComplete: false,
          nodes: null,
        }),
      }));

      event.preventDefault();
    };

    return (
      <>
        <form onSubmit={handleSubmit}>
          <input type="text" value={value} onChange={handleChange} />
          <button type="submit">Create</button>
        </form>

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
                  <Row key={item.id} item={item}>
                    {(tableItem) => (
                      <React.Fragment key={tableItem.id}>
                        <Cell>{tableItem.name}</Cell>
                        <Cell>
                          {tableItem.deadline.toLocaleDateString(
                            'fr-CA',
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
                      </React.Fragment>
                    )}
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </>
    );
  })
  .add('delete', () => {
    const [data, setData] = React.useState({ nodes });

    const handleRemove = (id) => {
      setData((state) => ({
        ...state,
        nodes: state.nodes.filter((node) => node.id !== id),
      }));
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
                <HeaderCell>Actions</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  {(tableItem) => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'fr-CA',
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
                      <Cell>
                        <button
                          type="button"
                          onClick={() => handleRemove(tableItem.id)}
                        >
                          Remove
                        </button>
                      </Cell>
                    </React.Fragment>
                  )}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('update', () => {
    const [data, setData] = React.useState({ nodes });

    const handleUpdate = (value, id) => {
      setData((state) => ({
        ...state,
        nodes: state.nodes.map((node) => {
          if (node.id === id) {
            return { ...node, name: value };
          } else {
            return node;
          }
        }),
      }));
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
                <Row key={item.id} item={item}>
                  {(tableItem) => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>
                        <input
                          style={{ width: '100%' }}
                          type="text"
                          value={tableItem.name}
                          onChange={(event) =>
                            handleUpdate(
                              event.target.value,
                              tableItem.id
                            )
                          }
                        />
                      </Cell>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'fr-CA',
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
                    </React.Fragment>
                  )}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });
