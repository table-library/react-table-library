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
import { getTheme } from '@overmap-ai/react-table-library/baseline';

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
        &:not(:last-of-type) {
          border-right: 1px solid #a0a8ae;
        }
      `,
    HeaderCell: `
        padding-right: 6px;

        & > div {
          display: flex;
          justify-content: space-between;
        }
      `,
  });

  return (
    <Table data={data} theme={theme}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>
                <span>Task</span>
                <strong>1</strong>
              </HeaderCell>
              <HeaderCell>
                <span>Deadline</span>
                <strong>2</strong>
              </HeaderCell>
              <HeaderCell>
                <span>Type</span>
                <strong>3</strong>
              </HeaderCell>
              <HeaderCell>
                <span>Complete</span>
                <strong>4</strong>
              </HeaderCell>
              <HeaderCell>
                <span>Tasks</span>
                <strong>5</strong>
              </HeaderCell>
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
