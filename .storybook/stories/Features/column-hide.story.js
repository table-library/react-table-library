/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
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

storiesOf('Features/Column Hiding', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const data = { nodes };

    const [hiddenColumns, setHiddenColumns] = React.useState([
      'deadline',
      'complete',
    ]);

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
              value="name"
              checked={!hiddenColumns.includes('name')}
              onChange={() => toggleColumn('name')}
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
              checked={!hiddenColumns.includes('deadline')}
              onChange={() => toggleColumn('deadline')}
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
              checked={!hiddenColumns.includes('type')}
              onChange={() => toggleColumn('type')}
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
              checked={!hiddenColumns.includes('complete')}
              onChange={() => toggleColumn('complete')}
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
              checked={!hiddenColumns.includes('tasks')}
              onChange={() => toggleColumn('tasks')}
            />
            Tasks
          </label>
        </div>

        <Table data={data} layout={{ hiddenColumns }}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell cellKey="name">Task</HeaderCell>
                  <HeaderCell cellKey="deadline">Deadline</HeaderCell>
                  <HeaderCell cellKey="type">Type</HeaderCell>
                  <HeaderCell cellKey="complete">Complete</HeaderCell>
                  <HeaderCell cellKey="tasks">Tasks</HeaderCell>
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
  })
  .add('with callback', () => {
    const data = { nodes };

    const [hiddenColumns, setHiddenColumns] = React.useState([
      'deadline',
      'complete',
    ]);

    const toggleColumn = (column) => {
      if (hiddenColumns.includes(column)) {
        setHiddenColumns(hiddenColumns.filter((v) => v !== column));
      } else {
        setHiddenColumns(hiddenColumns.concat(column));
      }
    };

    useCustom('columnHide', data, {
      state: { hiddenColumns },
      onChange: onColumnHideChange,
    });

    function onColumnHideChange(action, state) {
      console.log(action, state);
    }

    return (
      <>
        <div>
          <label htmlFor="name">
            <input
              id="name"
              type="checkbox"
              value="name"
              checked={!hiddenColumns.includes('name')}
              onChange={() => toggleColumn('name')}
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
              checked={!hiddenColumns.includes('deadline')}
              onChange={() => toggleColumn('deadline')}
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
              checked={!hiddenColumns.includes('type')}
              onChange={() => toggleColumn('type')}
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
              checked={!hiddenColumns.includes('complete')}
              onChange={() => toggleColumn('complete')}
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
              checked={!hiddenColumns.includes('tasks')}
              onChange={() => toggleColumn('tasks')}
            />
            Tasks
          </label>
        </div>

        <Table data={data} layout={{ hiddenColumns }}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell cellKey="name">Task</HeaderCell>
                  <HeaderCell cellKey="deadline">Deadline</HeaderCell>
                  <HeaderCell cellKey="type">Type</HeaderCell>
                  <HeaderCell cellKey="complete">Complete</HeaderCell>
                  <HeaderCell cellKey="tasks">Tasks</HeaderCell>
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
  })
  .add('documentation', () => (
    <ul>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
    </ul>
  ));
