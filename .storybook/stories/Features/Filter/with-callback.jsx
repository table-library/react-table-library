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
} from '@table-library/react-table-library/table';

import { nodes } from '../../data';

const Component = () => {
  let data = { nodes };

  const [isHide, setHide] = React.useState(false);

  useCustom('filters', data, {
    state: { isHide },
    onChange: onFiltersChange,
  });

  function onFiltersChange(action, state) {
    console.log(action, state);
  }

  data = {
    nodes: isHide ? data.nodes.filter((node) => !node.isComplete) : data.nodes,
  };

  return (
    <>
      <div>
        <label htmlFor="complete">
          Hide Complete:
          <input id="complete" type="checkbox" checked={isHide} onChange={() => setHide(!isHide)} />
        </label>
      </div>
      <br />

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
          </>
        )}
      </Table>
    </>
  );
};

export default Component;
