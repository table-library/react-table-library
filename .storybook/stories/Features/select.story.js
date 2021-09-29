/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import MaterialCheckbox from '@material-ui/core/Checkbox';

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
  HeaderCellSelect,
  CellSelect,
  SELECT_CLICK_TYPES,
  SELECT_TYPES,
  useRowSelect,
  Checkbox,
} from '@table-library/react-table-library/select';

import { nodes } from '../data';

storiesOf('Features/Select', module)
  .addParameters({ component: Table })
  .add('documentation', () => (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.robinwieruch.de/react-table-select"
      >
        Tutorial
      </a>
      <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
        Story Code
      </a>
    </>
  ))
  .add('base', () => {
    const data = { nodes };

    const select = useRowSelect(data, {
      onChange: onSelectChange,
    });

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
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
    );
  })
  .add('checkbox', () => {
    const data = { nodes };

    const select = useRowSelect(data, {
      onChange: onSelectChange,
    });

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} select={select}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
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
                  <CellSelect item={item} />
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
    );
  })
  .add('select on checkbox ', () => {
    const data = { nodes };

    const select = useRowSelect(
      data,
      {
        onChange: onSelectChange,
      },
      {
        clickType: SELECT_CLICK_TYPES.ButtonClick,
      }
    );

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} select={select}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
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
                  <CellSelect item={item} />
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
    );
  })

  .add('all single select', () => {
    const data = { nodes };

    const select = useRowSelect(
      data,
      {
        onChange: onSelectChange,
      },
      {
        rowSelect: SELECT_TYPES.SingleSelect,
        buttonSelect: SELECT_TYPES.SingleSelect,
      }
    );

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} select={select}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
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
                  <CellSelect item={item} />
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
    );
  })
  .add('all multi select', () => {
    const data = { nodes };

    const select = useRowSelect(
      data,
      {
        onChange: onSelectChange,
      },
      {
        rowSelect: SELECT_TYPES.MultiSelect,
        buttonSelect: SELECT_TYPES.MultiSelect,
      }
    );

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} select={select}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
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
                  <CellSelect item={item} />
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
    );
  })
  .add('default single select', () => {
    const data = { nodes };

    const select = useRowSelect(data, {
      state: { id: '3' },
      onChange: onSelectChange,
    });

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} select={select}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
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
                  <CellSelect item={item} />
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
    );
  })
  .add('default multi select', () => {
    const data = { nodes };

    const select = useRowSelect(data, {
      state: { ids: ['2', '4'] },
      onChange: onSelectChange,
    });

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} select={select}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
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
                  <CellSelect item={item} />
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
    );
  })
  .add('carry-forward', () => {
    const data = { nodes };

    const select = useRowSelect(
      data,
      {
        onChange: onSelectChange,
      },
      {
        isCarryForward: true,
      }
    );

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} select={select}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
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
                  <CellSelect item={item} />
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
    );
  })
  .add('custom checkbox (Material UI)', () => {
    const data = { nodes };

    const select = useRowSelect(data, {
      onChange: onSelectChange,
    });

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} select={select}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell shrink>
                  <MaterialCheckbox
                    size="small"
                    checked={select.state.all}
                    indeterminate={
                      !select.state.all && !select.state.none
                    }
                    onChange={select.fns.onToggleAll}
                  />
                </HeaderCell>
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
                  <Cell shrink>
                    <MaterialCheckbox
                      size="small"
                      checked={select.state.ids.includes(item.id)}
                      onChange={() =>
                        select.fns.onToggleById(item.id)
                      }
                    />
                  </Cell>
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
    );
  });
