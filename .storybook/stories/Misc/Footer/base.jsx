import * as React from 'react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
  Footer,
  FooterRow,
  FooterCell,
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

          <Footer>
            <FooterRow>
              <FooterCell>Task</FooterCell>
              <FooterCell>Deadline</FooterCell>
              <FooterCell>Type</FooterCell>
              <FooterCell>Complete</FooterCell>
              <FooterCell>Tasks</FooterCell>
            </FooterRow>
          </Footer>
        </>
      )}
    </Table>
  );
};

export default Component;
