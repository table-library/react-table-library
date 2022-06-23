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

import { useTheme } from '@table-library/react-table-library/theme';

import { nodes } from '../data';

storiesOf('Features/Column Hiding', module)
  .addParameters({
    component: Table,
    subcomponents: {
      Header,
      HeaderRow,
      Body,
      Row,
      HeaderCell,
      Cell,
    },
  })
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

        <Table data={data}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell hide={hiddenColumns.includes('NAME')}>Task</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('DEADLINE')}>Deadline</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('TYPE')}>Type</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('COMPLETE')}>Complete</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('TASKS')}>Tasks</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <Cell hide={hiddenColumns.includes('NAME')}>{item.name}</Cell>
                    <Cell hide={hiddenColumns.includes('DEADLINE')}>
                      {item.deadline.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </Cell>
                    <Cell hide={hiddenColumns.includes('TYPE')}>{item.type}</Cell>
                    <Cell hide={hiddenColumns.includes('COMPLETE')}>
                      {item.isComplete.toString()}
                    </Cell>
                    <Cell hide={hiddenColumns.includes('TASKS')}>{item.nodes?.length}</Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </>
    );
  })
  .add('with custom layout', () => {
    const data = { nodes };

    const [hiddenColumns, setHiddenColumns] = React.useState(['DEADLINE', 'COMPLETE']);

    const toggleColumn = (column) => {
      if (hiddenColumns.includes(column)) {
        setHiddenColumns(hiddenColumns.filter((v) => v !== column));
      } else {
        setHiddenColumns(hiddenColumns.concat(column));
      }
    };

    const theme = useTheme({
      Table: `
        --data-table-library_grid-template-columns:  30% 50% 20%;
      `,
    });

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

        <Table data={data} theme={theme} layout={{ custom: true }}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell hide={hiddenColumns.includes('NAME')}>Task</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('DEADLINE')}>Deadline</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('TYPE')}>Type</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('COMPLETE')}>Complete</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('TASKS')}>Tasks</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <Cell hide={hiddenColumns.includes('NAME')}>{item.name}</Cell>
                    <Cell hide={hiddenColumns.includes('DEADLINE')}>
                      {item.deadline.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </Cell>
                    <Cell hide={hiddenColumns.includes('TYPE')}>{item.type}</Cell>
                    <Cell hide={hiddenColumns.includes('COMPLETE')}>
                      {item.isComplete.toString()}
                    </Cell>
                    <Cell hide={hiddenColumns.includes('TASKS')}>{item.nodes?.length}</Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </>
    );
  })
  .add('on layout change', () => {
    const data = { nodes };

    const [hiddenColumns, setHiddenColumns] = React.useState(['DEADLINE', 'COMPLETE']);

    const toggleColumn = (column) => {
      if (hiddenColumns.includes(column)) {
        setHiddenColumns(hiddenColumns.filter((v) => v !== column));
      } else {
        setHiddenColumns(hiddenColumns.concat(column));
      }
    };

    const handleLayoutChange = (widths) => console.log(widths);

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

        <Table data={data} layout={{ hiddenColumns, onLayoutChange: handleLayoutChange }}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell hide={hiddenColumns.includes('NAME')}>Task</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('DEADLINE')}>Deadline</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('TYPE')}>Type</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('COMPLETE')}>Complete</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('TASKS')}>Tasks</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <Cell hide={hiddenColumns.includes('NAME')}>{item.name}</Cell>
                    <Cell hide={hiddenColumns.includes('DEADLINE')}>
                      {item.deadline.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </Cell>
                    <Cell hide={hiddenColumns.includes('TYPE')}>{item.type}</Cell>
                    <Cell hide={hiddenColumns.includes('COMPLETE')}>
                      {item.isComplete.toString()}
                    </Cell>
                    <Cell hide={hiddenColumns.includes('TASKS')}>{item.nodes?.length}</Cell>
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

    const [hiddenColumns, setHiddenColumns] = React.useState(['DEADLINE', 'COMPLETE']);

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

        <Table data={data} layout={{ hiddenColumns }}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell hide={hiddenColumns.includes('NAME')}>Task</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('DEADLINE')}>Deadline</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('TYPE')}>Type</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('COMPLETE')}>Complete</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('TASKS')}>Tasks</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <Cell hide={hiddenColumns.includes('NAME')}>{item.name}</Cell>
                    <Cell hide={hiddenColumns.includes('DEADLINE')}>
                      {item.deadline.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </Cell>
                    <Cell hide={hiddenColumns.includes('TYPE')}>{item.type}</Cell>
                    <Cell hide={hiddenColumns.includes('COMPLETE')}>
                      {item.isComplete.toString()}
                    </Cell>
                    <Cell hide={hiddenColumns.includes('TASKS')}>{item.nodes?.length}</Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </>
    );
  });
