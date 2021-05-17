/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import Button from '@material-ui/core/Button';

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
  SORT_ICON_POSITIONS,
} from '@table-library/react-table-library/sort';

import { nodes } from '../data';

storiesOf('Features/Sort', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const data = { nodes };

    const sort = useSort(data, {
      onChange: onSortChange,
    });

    function onSortChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} sort={sort}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  resize
                  sortKey="TASK"
                  sortFn={(array) =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                >
                  Task
                </HeaderCellSort>
                <HeaderCellSort
                  resize
                  sortKey="DEADLINE"
                  sortFn={(array) =>
                    array.sort((a, b) => a.deadline - b.deadline)
                  }
                >
                  Deadline
                </HeaderCellSort>
                <HeaderCellSort
                  resize
                  sortKey="TYPE"
                  sortFn={(array) =>
                    array.sort((a, b) => a.type.localeCompare(b.type))
                  }
                >
                  Type
                </HeaderCellSort>
                <HeaderCellSort
                  resize
                  sortKey="COMPLETE"
                  sortFn={(array) =>
                    array.sort((a, b) => a.isComplete - b.isComplete)
                  }
                >
                  Complete
                </HeaderCellSort>
                <HeaderCellSort
                  resize
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
    );
  })
  .add('default sort', () => {
    const data = { nodes };

    const sort = useSort(data, {
      state: {
        sortKey: 'TASK',
        sortFn: (array) =>
          array.sort((a, b) => a.name.localeCompare(b.name)),
        reverse: false,
      },
      onChange: onSortChange,
    });

    function onSortChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} sort={sort}>
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
    );
  })
  .add('sort icon size ', () => {
    const data = { nodes };

    const sort = useSort(
      data,
      {
        onChange: onSortChange,
      },
      {
        sortIcon: {
          size: '10px',
        },
      }
    );

    function onSortChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} sort={sort}>
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
    );
  })
  .add('sort icon position ', () => {
    const data = { nodes };

    const sort = useSort(
      data,
      {
        onChange: onSortChange,
      },
      {
        sortIcon: {
          position: SORT_ICON_POSITIONS.Prefix,
        },
      }
    );

    function onSortChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} sort={sort}>
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
    );
  })
  .add('no sort icon', () => {
    const data = { nodes };

    const sort = useSort(
      data,
      {
        onChange: onSortChange,
      },
      {
        sortIcon: {
          iconDefault: null,
          iconUp: null,
          iconDown: null,
        },
      }
    );

    function onSortChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} sort={sort}>
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
    );
  })
  .add('custom sort icon (Material UI)', () => {
    const data = { nodes };

    const sort = useSort(
      data,
      {
        onChange: onSortChange,
      },
      {
        sortIcon: {
          margin: '0px',
          iconDefault: <UnfoldMoreOutlinedIcon fontSize="small" />,
          iconUp: <KeyboardArrowUpOutlinedIcon fontSize="small" />,
          iconDown: (
            <KeyboardArrowDownOutlinedIcon fontSize="small" />
          ),
        },
      }
    );

    function onSortChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} sort={sort}>
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
    );
  })
  .add('custom sort button (Material UI)', () => {
    const data = { nodes };

    const sort = useSort(data, {
      onChange: onSortChange,
    });

    function onSortChange(action, state) {
      console.log(action, state);
    }

    const getIcon = (sortKey) => {
      if (sort.state.sortKey === sortKey && sort.state.reverse) {
        return <KeyboardArrowDownOutlinedIcon />;
      }

      if (sort.state.sortKey === sortKey && !sort.state.reverse) {
        return <KeyboardArrowUpOutlinedIcon />;
      }

      return <UnfoldMoreOutlinedIcon />;
    };

    return (
      <Table data={data} sort={sort}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>
                  <Button
                    fullWidth
                    style={{ justifyContent: 'flex-start' }}
                    endIcon={getIcon('TASK')}
                    onClick={() =>
                      sort.fns.onToggleSort({
                        sortKey: 'TASK',
                        sortFn: (array) =>
                          array.sort((a, b) =>
                            a.name.localeCompare(b.name)
                          ),
                      })
                    }
                  >
                    Task
                  </Button>
                </HeaderCell>
                <HeaderCell>
                  <Button
                    fullWidth
                    style={{ justifyContent: 'flex-start' }}
                    endIcon={getIcon('DEADLINE')}
                    onClick={() =>
                      sort.fns.onToggleSort({
                        sortKey: 'DEADLINE',
                        sortFn: (array) =>
                          array.sort(
                            (a, b) => a.deadline - b.deadline
                          ),
                      })
                    }
                  >
                    Deadline
                  </Button>
                </HeaderCell>
                <HeaderCell>
                  <Button
                    fullWidth
                    style={{ justifyContent: 'flex-start' }}
                    endIcon={getIcon('TYPE')}
                    onClick={() =>
                      sort.fns.onToggleSort({
                        sortKey: 'TYPE',
                        sortFn: (array) =>
                          array.sort((a, b) =>
                            a.type.localeCompare(b.type)
                          ),
                      })
                    }
                  >
                    Type
                  </Button>
                </HeaderCell>
                <HeaderCell>
                  <Button
                    fullWidth
                    style={{ justifyContent: 'flex-start' }}
                    endIcon={getIcon('COMPLETE')}
                    onClick={() =>
                      sort.fns.onToggleSort({
                        sortKey: 'COMPLETE',
                        sortFn: (array) =>
                          array.sort(
                            (a, b) => a.isComplete - b.isComplete
                          ),
                      })
                    }
                  >
                    Complete
                  </Button>
                </HeaderCell>
                <HeaderCell>
                  <Button
                    fullWidth
                    style={{ justifyContent: 'flex-start' }}
                    endIcon={getIcon('TASKS')}
                    onClick={() =>
                      sort.fns.onToggleSort({
                        sortKey: 'TASKS',
                        sortFn: (array) =>
                          array.sort(
                            (a, b) =>
                              (a.nodes || []).length -
                              (b.nodes || []).length
                          ),
                      })
                    }
                  >
                    Tasks
                  </Button>
                </HeaderCell>
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
    );
  });
