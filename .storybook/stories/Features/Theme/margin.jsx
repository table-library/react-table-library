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
import { getTheme } from '@table-library/react-table-library/baseline';

import { nodes } from '../../data';

const Component = () => {
  const data = { nodes };

  const theme = useTheme({
    HeaderRow: `
        .th {
          border-bottom: 1px solid #a0a8ae;
        }
      `,
    BaseCell: `
        margin: 9px;
        padding: 11px;
      `,
    Cell: `
        &:not(:last-of-type) {
          border-right: 1px solid #a0a8ae;
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
