import * as React from 'react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@overmap-ai/react-table-library/table';

import { nodes } from '../../data';

const Component = () => {
  const [data, setData] = React.useState({ nodes });

  const handleUpdate = (value, id, property) => {
    setData((state) => ({
      ...state,
      nodes: state.nodes.map((node) => {
        if (node.id === id) {
          return { ...node, [property]: value };
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
                <Cell>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      border: 'none',
                      fontSize: '1rem',
                      padding: 0,
                      margin: 0,
                    }}
                    value={item.name}
                    onChange={(event) => handleUpdate(event.target.value, item.id, 'name')}
                  />
                </Cell>
                <Cell>
                  <input
                    type="date"
                    style={{
                      width: '100%',
                      border: 'none',
                      fontSize: '1rem',
                      padding: 0,
                      margin: 0,
                    }}
                    value={item.deadline.toISOString().substr(0, 10)}
                    onChange={(event) =>
                      handleUpdate(new Date(event.target.value), item.id, 'deadline')
                    }
                  />
                </Cell>
                <Cell>
                  <select
                    style={{
                      width: '100%',
                      border: 'none',
                      fontSize: '1rem',
                      padding: 0,
                      margin: 0,
                    }}
                    value={item.type}
                    onChange={(event) => handleUpdate(event.target.value, item.id, 'type')}
                  >
                    <option value="SETUP">SETUP</option>
                    <option value="LEARN">LEARN</option>
                  </select>
                </Cell>
                <Cell>
                  <input
                    type="checkbox"
                    checked={item.isComplete}
                    onChange={(event) => handleUpdate(event.target.checked, item.id, 'isComplete')}
                  />
                </Cell>
                <Cell>
                  <input
                    type="number"
                    style={{
                      width: '100%',
                      border: 'none',
                      fontSize: '1rem',
                      padding: 0,
                      margin: 0,
                    }}
                    value={typeof item.nodes === 'number' ? item.nodes : item.nodes?.length}
                    onChange={(event) => handleUpdate(Number(event.target.value), item.id, 'nodes')}
                  />
                </Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default Component;
