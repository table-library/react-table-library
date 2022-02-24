import * as React from 'react';
import { storiesOf } from '@storybook/react';

import {
  useCustom,
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import { nodes } from '../data';

storiesOf('Composites/Column Hide & Resize', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const data = { nodes };

    const [hiddenColumns, setHiddenColumns] = React.useState(['DEADLINE', 'COMPLETE']);

    const toggleColumn = (column) => {
      if (hiddenColumns.includes(column)) {
        setHiddenColumns(hiddenColumns.filter((v) => v !== column));
      } else {
        setHiddenColumns(hiddenColumns.concat(column));
      }
    };

    return (
      <>
        <div>
          <label htmlFor="name">
            <input
              id="name"
              type="checkbox"
              value="NAME"
              checked={!hiddenColumns.includes('NAME')}
              onChange={() => toggleColumn('NAME')}
            />
            Name
          </label>
        </div>

        <div>
          <label htmlFor="deadline">
            <input
              id="deadline"
              type="checkbox"
              value="DEADLINE"
              checked={!hiddenColumns.includes('DEADLINE')}
              onChange={() => toggleColumn('DEADLINE')}
            />
            Deadline
          </label>
        </div>

        <div>
          <label htmlFor="type">
            <input
              id="type"
              type="checkbox"
              value="TYPE"
              checked={!hiddenColumns.includes('TYPE')}
              onChange={() => toggleColumn('TYPE')}
            />
            Type
          </label>
        </div>

        <div>
          <label htmlFor="complete">
            <input
              id="complete"
              type="checkbox"
              value="COMPLETE"
              checked={!hiddenColumns.includes('COMPLETE')}
              onChange={() => toggleColumn('COMPLETE')}
            />
            Complete
          </label>
        </div>

        <div>
          <label htmlFor="tasks">
            <input
              id="tasks"
              type="checkbox"
              value="TASKS"
              checked={!hiddenColumns.includes('TASKS')}
              onChange={() => toggleColumn('TASKS')}
            />
            Tasks
          </label>
        </div>

        <Table
          data={data}
          layout={{
            hiddenColumns,
          }}
        >
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell resize hideKey="NAME">
                    Task
                  </HeaderCell>
                  <HeaderCell resize hideKey="DEADLINE">
                    Deadline
                  </HeaderCell>
                  <HeaderCell resize hideKey="TYPE">
                    Type
                  </HeaderCell>
                  <HeaderCell resize hideKey="COMPLETE">
                    Complete
                  </HeaderCell>
                  <HeaderCell resize hideKey="TASKS">
                    Tasks
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
      </>
    );
  });
