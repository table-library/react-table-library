import * as React from 'react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
  useCustom,
} from '@overmap-ai/react-table-library/table';

import { nodes } from '../../data';

const Component = () => {
  const data = { nodes };

  const [columns, setColumns] = React.useState([
    { label: 'Task', get: (item) => item.name },
    {
      label: 'Deadline',
      get: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
    },
    { label: 'Type', get: (item) => item.type },
    {
      label: 'Complete',
      get: (item) => item.isComplete.toString(),
    },
    { label: 'Tasks', get: (item) => item.nodes?.length },
  ]);

  const handleOrder = () => {
    setColumns([...columns].sort(() => 0.5 - Math.random()));
  };

  useCustom('columnOrder', data, {
    state: { columns },
    onChange: onColumnOrderChange,
  });

  function onColumnOrderChange(action, state) {
    console.log(action, state);
  }

  return (
    <>
      <button type="button" onClick={handleOrder}>
        Shuffle
      </button>

      <Table data={data}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                {columns.map((column, index) => (
                  <HeaderCell key={index}>{column.label}</HeaderCell>
                ))}
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  {columns.map((column, index) => (
                    <Cell key={index}>{column.get(item)}</Cell>
                  ))}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </>
  );
};

export default Component;
