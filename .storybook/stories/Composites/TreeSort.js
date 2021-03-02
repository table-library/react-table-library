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
  Cell,
} from '@table-library/react-table-library/table';

import { useTree } from '@table-library/react-table-library/tree';

import {
  useSort,
  HeaderCellSort,
} from '@table-library/react-table-library/sort';

import { nodes } from '../data';

storiesOf('Composites/03. Tree & Sort', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const data = { nodes };

    const tree = useTree(data, {
      onChange: onTreeChange,
    });

    const sort = useSort(data, {
      onChange: onSortChange,
    });

    function onSortChange(action, state) {
      console.log(action, state);
    }

    function onTreeChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} tree={tree} sort={sort}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  sortKey="TASK"
                  sortFn={(array) =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                >
                  Task
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="DEADLINE"
                  sortFn={(array) =>
                    array.sort((a, b) => a.deadline - b.deadline)
                  }
                >
                  Deadline
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="TYPE"
                  sortFn={(array) =>
                    array.sort((a, b) => a.type.localeCompare(b.type))
                  }
                >
                  Type
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="COMPLETE"
                  sortFn={(array) =>
                    array.sort((a, b) => a.isComplete - b.isComplete)
                  }
                >
                  Complete
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="TASKS"
                  sortFn={(array) =>
                    array.sort(
                      (a, b) =>
                        (a.nodes || []).length -
                        (b.nodes || []).length
                    )
                  }
                >
                  Tasks
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row item={item} key={item.id}>
                  {(tableItem) => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'fr-CA',
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
                    </React.Fragment>
                  )}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });
