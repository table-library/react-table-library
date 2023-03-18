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

  const theme = useTheme({
    BaseCell: `
        &:hover, &:focus {
          outline: dotted;
          outline-width: 1px;
          outline-offset: -1px;
        }
      `,
  });

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
            {tableList.map((item, index) => (
              <Row key={item.id} item={item}>
                <Cell tabIndex="-1" onClick={(event) => console.log('Click Cell', event)}>
                  {item.name}
                </Cell>
                <Cell tabIndex="-1">
                  {item.deadline.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </Cell>
                <Cell tabIndex="-1">{item.type}</Cell>
                <Cell tabIndex="-1">{item.isComplete.toString()}</Cell>
                <Cell tabIndex="-1">{item.nodes?.length}</Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default Component;
