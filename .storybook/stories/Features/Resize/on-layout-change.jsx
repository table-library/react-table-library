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

  const handleLayoutChange = (widths) => console.log(widths);

  return (
    <Table data={data} layout={{ onLayoutChange: handleLayoutChange }}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell resize>Task</HeaderCell>
              <HeaderCell resize>Deadline</HeaderCell>
              <HeaderCell resize>Type</HeaderCell>
              <HeaderCell resize>Complete</HeaderCell>
              <HeaderCell>Tasks</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
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
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default Component;
