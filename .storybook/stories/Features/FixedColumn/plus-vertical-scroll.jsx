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
    Table: `
        --data-table-library_grid-template-columns:  250px 150px 25% 25% 50%;
      `,
    BaseCell: `
        &:nth-of-type(1) {
          left: 0px;
        }

        &:nth-of-type(2) {
          left: 250px;
        }
      `,
  });

  return (
    <div
      style={{
        height: '100px',
      }}
    >
      <Table
        data={data}
        theme={theme}
        layout={{ custom: true, horizontalScroll: true, fixedHeader: true }}
      >
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell pinLeft>Task</HeaderCell>
                <HeaderCell pinLeft>Deadline</HeaderCell>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Complete</HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell pinLeft>{item.name}</Cell>
                  <Cell pinLeft>
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
    </div>
  );
};

export default Component;
