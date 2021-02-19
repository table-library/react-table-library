/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell
} from '@table-library/react-table-library/lib/table';

import { nodes } from '../data';

storiesOf('02. Features/ 11. Column Hiding', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const data = { nodes };

    const [columns, setColumns] = React.useState([
      'name',
      'deadline',
      'type',
      'complete',
      'tasks'
    ]);

    const handleColumns = column => {
      if (columns.includes(column)) {
        setColumns(columns.filter(value => value !== column));
      } else {
        setColumns(columns.concat(column));
      }
    };

    return (
      <>
        <div>
          <label htmlFor="name">
            <input
              id="name"
              type="checkbox"
              value="name"
              checked={columns.includes('name')}
              onChange={() => handleColumns('name')}
            />
            Name
          </label>
        </div>

        <div>
          <label htmlFor="deadline">
            <input
              id="deadline"
              type="checkbox"
              value="deadline"
              checked={columns.includes('deadline')}
              onChange={() => handleColumns('deadline')}
            />
            Deadline
          </label>
        </div>

        <div>
          <label htmlFor="type">
            <input
              id="type"
              type="checkbox"
              value="type"
              checked={columns.includes('type')}
              onChange={() => handleColumns('type')}
            />
            Type
          </label>
        </div>

        <div>
          <label htmlFor="complete">
            <input
              id="complete"
              type="checkbox"
              value="complete"
              checked={columns.includes('complete')}
              onChange={() => handleColumns('complete')}
            />
            Complete
          </label>
        </div>

        <div>
          <label htmlFor="tasks">
            <input
              id="tasks"
              type="checkbox"
              value="tasks"
              checked={columns.includes('tasks')}
              onChange={() => handleColumns('tasks')}
            />
            Tasks
          </label>
        </div>

        <Table data={data}>
          {tableList => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell hide={!columns.includes('name')}>
                    Task
                  </HeaderCell>
                  <HeaderCell hide={!columns.includes('deadline')}>
                    Deadline
                  </HeaderCell>
                  <HeaderCell hide={!columns.includes('type')}>
                    Type
                  </HeaderCell>
                  <HeaderCell hide={!columns.includes('complete')}>
                    Complete
                  </HeaderCell>
                  <HeaderCell hide={!columns.includes('tasks')}>
                    Tasks
                  </HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map(item => (
                  <Row key={item.id} item={item}>
                    {tableItem => (
                      <React.Fragment key={tableItem.id}>
                        <Cell hide={!columns.includes('name')}>
                          {tableItem.name}
                        </Cell>
                        <Cell hide={!columns.includes('deadline')}>
                          {tableItem.deadline.toLocaleDateString(
                            'fr-CA',
                            {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit'
                            }
                          )}
                        </Cell>
                        <Cell hide={!columns.includes('type')}>
                          {tableItem.type}
                        </Cell>
                        <Cell hide={!columns.includes('complete')}>
                          {tableItem.isComplete.toString()}
                        </Cell>
                        <Cell hide={!columns.includes('tasks')}>
                          {tableItem.nodes?.length}
                        </Cell>
                      </React.Fragment>
                    )}
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </>
    );
  });
