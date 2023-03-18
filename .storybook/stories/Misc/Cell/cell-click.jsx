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
import { useTheme } from '@table-library/react-table-library/theme';

import { nodes } from '../../data';

const Component = () => {
  const data = { nodes };

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
                <Cell onClick={(event) => console.log('Click Cell 1', event)}>{item.name}</Cell>
                <Cell onClick={(event) => console.log('Click Cell 2', event)}>
                  {item.deadline.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </Cell>
                <Cell onClick={(event) => console.log('Click Cell 3', event)}>{item.type}</Cell>
                <Cell onClick={(event) => console.log('Click Cell 4', event)}>
                  {item.isComplete.toString()}
                </Cell>
                <Cell onClick={(event) => console.log('Click Cell 5', event)}>
                  {item.nodes?.length}
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
