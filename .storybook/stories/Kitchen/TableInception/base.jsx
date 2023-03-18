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

  const [ids, setIds] = React.useState([]);

  const handleExpand = (item) => {
    if (ids.includes(item.id)) {
      setIds(ids.filter((id) => id !== item.id));
    } else {
      setIds(ids.concat(item.id));
    }
  };

  const themeSecondary = useTheme({
    Table: `
        display: inherit;
      `,
    HeaderRow: `
        .th {
          border-top: 1px solid #a0a8ae;
          border-bottom: 1px solid #a0a8ae;
        }
      `,
    Row: `
        &:last-of-type .td {
          border-bottom: 1px solid #a0a8ae;
        }
      `,
  });

  return (
    <Table data={data}>
      {(tableListPrimary) => (
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
            {tableListPrimary.map((item) => (
              <React.Fragment key={item.id}>
                <Row item={item} onClick={handleExpand}>
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

                {ids.includes(item.id) && (
                  <Table data={{ nodes: item.nodes || [] }} theme={themeSecondary}>
                    {(tableListSecondary) => (
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
                          {tableListSecondary.map((item) => (
                            <React.Fragment key={item.id}>
                              <Row item={item} onClick={handleExpand}>
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
                            </React.Fragment>
                          ))}
                        </Body>
                      </>
                    )}
                  </Table>
                )}
              </React.Fragment>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default Component;
