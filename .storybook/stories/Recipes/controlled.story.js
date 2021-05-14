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
  Cell,
} from '@table-library/react-table-library/table';

import {
  useSort,
  HeaderCellSort,
} from '@table-library/react-table-library/sort';

import {
  useRowSelect,
  SELECT_TYPES,
} from '@table-library/react-table-library/select';

import { nodes } from '../data';

storiesOf('Recipes/Controlled', module)
  .addParameters({ component: Table })
  .add('sort', () => {
    const SORTS = {
      NONE: {
        label: 'None',
        sortKey: 'NONE',
        sortFn: (array) => array,
      },
      TASK: {
        label: 'Task',
        sortKey: 'TASK',
        sortFn: (array) =>
          array.sort((a, b) => a.name.localeCompare(b.name)),
      },
      DEADLINE: {
        label: 'Deadline',
        sortKey: 'DEADLINE',
        sortFn: (array) =>
          array.sort((a, b) => a.deadline - b.deadline),
      },
      TYPE: {
        label: 'Type',
        sortKey: 'TYPE',
        sortFn: (array) =>
          array.sort((a, b) => a.type.localeCompare(b.type)),
      },
      COMPLETE: {
        label: 'Complete',
        sortKey: 'COMPLETE',
        sortFn: (array) =>
          array.sort((a, b) => a.isComplete - b.isComplete),
      },
      TASKS: {
        label: 'Tasks',
        sortKey: 'TASKS',
        sortFn: (array) =>
          array.sort(
            (a, b) => (a.nodes || []).length - (b.nodes || []).length
          ),
      },
    };

    const data = { nodes };

    const sort = useSort(data, {
      onChange: onSortChange,
    });

    function onSortChange(action, state) {
      console.log(action, state);
    }

    return (
      <>
        <select
          value={sort.state.sortKey}
          onChange={(event) =>
            sort.fns.onToggleSort(SORTS[event.target.value])
          }
        >
          {Object.keys(SORTS).map((key) => (
            <option key={key} value={SORTS[key].sortKey}>
              {SORTS[key].label}
            </option>
          ))}
        </select>

        <Table data={data} sort={sort}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  {Object.keys(SORTS)
                    .filter((key) => key !== 'NONE')
                    .map((key) => (
                      <HeaderCellSort
                        key={key}
                        sortKey={SORTS[key].sortKey}
                        sortFn={SORTS[key].sortFn}
                      >
                        {SORTS[key].label}
                      </HeaderCellSort>
                    ))}
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row item={item} key={item.id}>
                    {(tableItem) => (
                      <>
                        <Cell>{tableItem.name}</Cell>
                        <Cell>
                          {tableItem.deadline.toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                            }
                          )}
                        </Cell>
                        <Cell>{tableItem.type}</Cell>
                        <Cell>{tableItem.isComplete.toString()}</Cell>
                        <Cell>{tableItem.nodes?.length}</Cell>
                      </>
                    )}
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </>
    );
  })
  .add('select', () => {
    const data = { nodes };

    const [
      controlledSelectState,
      setControlledSelectState,
    ] = React.useState({ ids: [] });

    const select = useRowSelect(
      data,
      {
        state: controlledSelectState,
        onChange: onSelectChange,
      },
      {
        rowSelect: SELECT_TYPES.MultiSelect,
      }
    );

    function onSelectChange(action, state) {
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
                    {(tableItem) => (
                      <>
                        <Cell>{tableItem.name}</Cell>
                        <Cell>
                          {tableItem.deadline.toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                            }
                          )}
                        </Cell>
                        <Cell>{tableItem.type}</Cell>
                        <Cell>{tableItem.isComplete.toString()}</Cell>
                        <Cell>{tableItem.nodes?.length}</Cell>
                      </>
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
