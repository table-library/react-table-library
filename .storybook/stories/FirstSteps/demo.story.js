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
import { useTheme } from '@table-library/react-table-library/theme';
import {
  CellTree,
  useTree,
  TREE_EXPAND_CLICK_TYPES,
} from '@table-library/react-table-library/tree';
import {
  CellSelect,
  HeaderCellSelect,
  useRowSelect,
} from '@table-library/react-table-library/select';
import {
  useSort,
  HeaderCellSort,
} from '@table-library/react-table-library/sort';
import { usePagination } from '@table-library/react-table-library/pagination';

import { nodes } from '../data';

storiesOf('First Steps', module)
  .addParameters({ component: Table })
  .add('Demo', () => {
    const data = {
      nodes,
    };

    const theme = useTheme({
      Table: `
        border-radius: 4px;
        border: 1px solid #e0e0e0;
      `,
      BaseRow: `
        height: 52px;
        font-size: 14px;

        border-bottom: 1px solid #e0e0e0;
      `,
      HeaderRow: `
        font-weight: bold;
      `,
      Row: `
        &:hover {
          background-color: #f5f5f5;
        }

        &.row-select-selected, &.row-select-single-selected {
          background-color: #edf4fb;

          &:hover {
            background-color: #e3eefa;
          }
        }
      `,
      HeaderCell: `
        border-right: 1px solid transparent;

        &:not(:first-child) {
          border-right: 1px dotted #e0e0e0;
        }
      `,
      Cell: `
        border-right: 1px solid transparent;
      `,
    });

    const tree = useTree(
      data,
      {
        onChange: onTreeChange,
      },
      {
        clickType: TREE_EXPAND_CLICK_TYPES.ButtonClick,
        treeYLevel: 1,
      }
    );

    const select = useRowSelect(data, {
      onChange: onSelectChange,
    });

    const sort = useSort(data, {
      onChange: onSortChange,
    });

    const pagination = usePagination(data, {
      state: {
        page: 0,
        size: 5,
      },
      onChange: onPaginationChange,
    });

    function onTreeChange(action, state) {
      console.log(action, state);
    }

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    function onSortChange(action, state) {
      console.log(action, state);
    }

    function onPaginationChange(action, state) {
      console.log(action, state);
    }

    const resize = { offset: 2 };

    return (
      <Table
        data={data}
        theme={theme}
        tree={tree}
        select={select}
        sort={sort}
        pagination={pagination}
      >
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
                <HeaderCellSort
                  resize={resize}
                  sortKey="TASK"
                  sortFn={(array) =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                >
                  Task
                </HeaderCellSort>
                <HeaderCellSort
                  resize={resize}
                  sortKey="DEADLINE"
                  sortFn={(array) =>
                    array.sort((a, b) => a.deadline - b.deadline)
                  }
                >
                  Deadline
                </HeaderCellSort>
                <HeaderCellSort
                  resize={resize}
                  sortKey="TYPE"
                  sortFn={(array) =>
                    array.sort((a, b) => a.type.localeCompare(b.type))
                  }
                >
                  Type
                </HeaderCellSort>
                <HeaderCellSort
                  resize={resize}
                  sortKey="COMPLETE"
                  sortFn={(array) =>
                    array.sort((a, b) => a.isComplete - b.isComplete)
                  }
                >
                  Complete
                </HeaderCellSort>
                <HeaderCellSort
                  resize={resize}
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
                <Row key={item.id} item={item}>
                  {(tableItem) => (
                    <>
                      <CellSelect item={tableItem} />
                      <CellTree item={tableItem}>
                        {tableItem.name}
                      </CellTree>
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

            <div
              style={{
                fontSize: '14px',
                padding: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>
                Total Pages:{' '}
                {pagination.state.getTotalPages(data.nodes)}
              </span>

              <span>
                Page:{' '}
                {pagination.state
                  .getPages(data.nodes)
                  .map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      style={{
                        fontWeight:
                          pagination.state.page === index
                            ? 'bold'
                            : 'normal',
                      }}
                      onClick={() => pagination.fns.onSetPage(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
              </span>
            </div>
          </>
        )}
      </Table>
    );
  });
