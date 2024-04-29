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

import { nodes } from '../../data';

const Component = () => {
  const data = { nodes };

  const OPTIONAL_COLUMNS = {
    deadline: {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
    },
    type: {
      label: 'Type',
      renderCell: (item) => item.type,
    },
  };

  const [column, setColumn] = React.useState('deadline');

  return (
    <Table data={data}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>Task</HeaderCell>
              <HeaderCell>
                <select value={column} onChange={(event) => setColumn(event.target.value)}>
                  {Object.keys(OPTIONAL_COLUMNS).map((key) => (
                    <option value={key}>{OPTIONAL_COLUMNS[key].label}</option>
                  ))}
                </select>
              </HeaderCell>
              <HeaderCell>Complete</HeaderCell>
              <HeaderCell>Tasks</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <Cell>{item.name}</Cell>
                <Cell>{OPTIONAL_COLUMNS[column].renderCell(item)}</Cell>
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
