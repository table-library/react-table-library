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
import { useRowSelect, SelectTypes } from '@table-library/react-table-library/select';

import { nodes } from '../../data';

const Component = () => {
  const data = { nodes };

  const [controlledSelectState, setControlledSelectState] = React.useState({ ids: [] });

  const select = useRowSelect(
    data,
    {
      state: controlledSelectState,
      onChange: onSelectChange,
    },
    {
      rowSelect: SelectTypes.MultiSelect,
    },
  );

  function onSelectChange(action, state) {
    console.log(action, state);

    setControlledSelectState(state);
  }

  const handleShuffle = () => {
    setControlledSelectState({
      ids: [...nodes]
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .map((node) => node.id),
    });
  };

  return (
    <>
      <button type="button" onClick={handleShuffle}>
        Shuffle
      </button>

      <Table data={data} select={select}>
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
                <Row item={item} key={item.id}>
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
    </>
  );
};

export default Component;
