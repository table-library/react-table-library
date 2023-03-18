import * as React from 'react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import { nodes } from '../../data';

const Component = () => {
  const data = { nodes };

  return (
    <Table data={data}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell
                gridColumnStart={1}
                gridColumnEnd={3}
                style={{ backgroundColor: 'blue', color: 'white' }}
              >
                Task
              </HeaderCell>
              <HeaderCell
                gridColumnStart={3}
                gridColumnEnd={5}
                style={{ backgroundColor: 'green', color: 'white' }}
              >
                Type
              </HeaderCell>
              <HeaderCell>Tasks</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item, index) =>
              index === 1 ? (
                <Row key={item.id} item={item}>
                  <Cell
                    gridColumnStart={1}
                    gridColumnEnd={4}
                    style={{ backgroundColor: 'red', color: 'white' }}
                  >
                    {item.name}
                  </Cell>
                  <Cell>{item.isComplete.toString()}</Cell>
                  <Cell>{item.nodes?.length}</Cell>
                </Row>
              ) : index === 2 ? (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
                  <Cell>
                    {item.deadline.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Cell>
                  <Cell>{item.type}</Cell>
                  <Cell
                    gridColumnStart={4}
                    gridColumnEnd={6}
                    style={{ backgroundColor: 'blue', color: 'white' }}
                  >
                    {item.isComplete.toString()}
                  </Cell>
                </Row>
              ) : index === 3 ? (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
                  <Cell
                    gridColumnStart={2}
                    gridColumnEnd={4}
                    style={{ backgroundColor: 'orange', color: 'white' }}
                  >
                    {item.deadline.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Cell>
                  <Cell>{item.isComplete.toString()}</Cell>
                  <Cell>{item.nodes?.length}</Cell>
                </Row>
              ) : index === 4 ? (
                <Row key={item.id} item={item}>
                  <Cell
                    gridColumnStart={1}
                    gridColumnEnd={3}
                    style={{ backgroundColor: 'green', color: 'white' }}
                  >
                    {item.name}
                  </Cell>
                  <Cell>{item.type}</Cell>
                  <Cell
                    gridColumnStart={4}
                    gridColumnEnd={6}
                    style={{ backgroundColor: 'green', color: 'white' }}
                  >
                    {item.isComplete.toString()}
                  </Cell>
                </Row>
              ) : (
                <Row key={item.id} item={item}>
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
              ),
            )}
          </Body>
        </>
      )}
    </Table>
  );
};

export default Component;
