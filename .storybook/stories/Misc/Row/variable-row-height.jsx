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
import { useTheme } from '@overmap-ai/react-table-library/theme';

import { nodes } from '../../data';

const Component = () => {
  const data = { nodes };

  const getHeight = (index) => ((index % 3) + 1) * 25;

  const theme = useTheme({
    HeaderRow: `
        background-color: #fafafa;
      `,
    Row: `
        &:nth-of-type(odd) {
          background-color: #f5f5f5;
        }

        &:nth-of-type(even) {
          background-color: #fafafa;
        }
      `,
  });

  const getCellStyle = (index) => ({ style: { height: `${getHeight(index)}px` } });

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
                <Cell
                  {...getCellStyle(index)}
                  onClick={(event) => console.log('Click Cell', event)}
                >
                  {item.name}
                </Cell>
                <Cell {...getCellStyle(index)}>
                  {item.deadline.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </Cell>
                <Cell {...getCellStyle(index)}>{item.type}</Cell>
                <Cell {...getCellStyle(index)}>{item.isComplete.toString()}</Cell>
                <Cell {...getCellStyle(index)}>{item.nodes?.length}</Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default Component;
