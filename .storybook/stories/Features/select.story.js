import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { createTheme as createMaterialTheme } from '@mui/material/styles';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import MaterialCheckbox from '@mui/material/Checkbox';

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
  HeaderCellSelect,
  CellSelect,
  SelectClickTypes,
  SelectTypes,
  useRowSelect,
} from '@table-library/react-table-library/select';

import { nodes } from '../data';

storiesOf('Features/Select', module)
  .addParameters({
    component: Table,
    subcomponents: {
      Header,
      HeaderRow,
      Body,
      Row,
      HeaderCell,
      Cell,
      HeaderCellSelect,
      CellSelect,
    },
  })
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

    const theme = useTheme({
      Table: `
        grid-template-columns: 24px repeat(5, minmax(0, 1fr));
      `,
    });

    const select = useRowSelect(data, {
      onChange: onSelectChange,
    });

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} theme={theme} layout={{ custom: true }} select={select}>
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
  .add('checkbox position', () => {
    const data = { nodes };

    const theme = useTheme({
      Table: `
        grid-template-columns: repeat(2, minmax(0, 1fr)) 24px repeat(1, minmax(0, 1fr));
      `,
    });

    const select = useRowSelect(data, {
      onChange: onSelectChange,
    });

    function onSelectChange(action, state) {
      console.log(action, state);
    }

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

        <Table data={data} theme={theme} layout={{ custom: true }} select={select}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell hide={hiddenColumns.includes('NAME')} resize>
                    Task
                  </HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('DEADLINE')} resize>
                    Deadline
                  </HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('TYPE')} resize>
                    Type
                  </HeaderCell>
                  <HeaderCellSelect />
                  <HeaderCell hide={hiddenColumns.includes('COMPLETE')} resize>
                    Complete
                  </HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('TASKS')} resize>
                    Tasks
                  </HeaderCell>
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
                    <CellSelect item={item} />
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
  .add('select on checkbox ', () => {
    const data = { nodes };

    const theme = useTheme({
      Table: `
        grid-template-columns: 24px repeat(5, minmax(0, 1fr));
      `,
    });

    const select = useRowSelect(
      data,
      {
        onChange: onSelectChange,
      },
      {
        clickType: SelectClickTypes.ButtonClick,
      },
    );

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} theme={theme} layout={{ custom: true }} select={select}>
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

    const theme = useTheme({
      Table: `
        grid-template-columns: 24px repeat(5, minmax(0, 1fr));
      `,
    });

    const select = useRowSelect(
      data,
      {
        onChange: onSelectChange,
      },
      {
        rowSelect: SelectTypes.SingleSelect,
        buttonSelect: SelectTypes.SingleSelect,
      },
    );

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} theme={theme} layout={{ custom: true }} select={select}>
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

    const theme = useTheme({
      Table: `
        grid-template-columns: 24px repeat(5, minmax(0, 1fr));
      `,
    });

    const select = useRowSelect(
      data,
      {
        onChange: onSelectChange,
      },
      {
        rowSelect: SelectTypes.MultiSelect,
        buttonSelect: SelectTypes.MultiSelect,
      },
    );

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} theme={theme} layout={{ custom: true }} select={select}>
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

    const theme = useTheme({
      Table: `
        grid-template-columns: 24px repeat(5, minmax(0, 1fr));
      `,
    });

    const select = useRowSelect(data, {
      state: { id: '3' },
      onChange: onSelectChange,
    });

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} theme={theme} layout={{ custom: true }} select={select}>
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

    const theme = useTheme({
      Table: `
        grid-template-columns: 24px repeat(5, minmax(0, 1fr));
      `,
    });

    const select = useRowSelect(data, {
      state: { ids: ['2', '4'] },
      onChange: onSelectChange,
    });

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} theme={theme} layout={{ custom: true }} select={select}>
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
  .add('isCarryForward', () => {
    const data = { nodes };

    const theme = useTheme({
      Table: `
        grid-template-columns: 24px repeat(5, minmax(0, 1fr));
      `,
    });

    const select = useRowSelect(
      data,
      {
        onChange: onSelectChange,
      },
      {
        isCarryForward: false,
      },
    );

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} theme={theme} layout={{ custom: true }} select={select}>
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
  .add('isPartialToAll', () => {
    const data = { nodes };

    const theme = useTheme({
      Table: `
        grid-template-columns: 24px repeat(5, minmax(0, 1fr));
      `,
    });

    const select = useRowSelect(
      data,
      {
        onChange: onSelectChange,
      },
      {
        isPartialToAll: true,
      },
    );

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} theme={theme} layout={{ custom: true }} select={select}>
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

    const theme = useTheme({
      Table: `
        grid-template-columns: 38px repeat(5, minmax(0, 1fr));
      `,
    });

    const select = useRowSelect(data, {
      onChange: onSelectChange,
    });

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <MaterialThemeProvider theme={createMaterialTheme({})}>
        <Table data={data} theme={theme} layout={{ custom: true }} select={select}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell stiff>
                    <MaterialCheckbox
                      inputProps={{ 'aria-label': 'select all' }}
                      size="small"
                      checked={select.state.all}
                      indeterminate={!select.state.all && !select.state.none}
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
                    <Cell stiff>
                      <MaterialCheckbox
                        inputProps={{ 'aria-label': 'select item' }}
                        size="small"
                        checked={select.state.ids.includes(item.id)}
                        onChange={() => select.fns.onToggleById(item.id)}
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
      </MaterialThemeProvider>
    );
  });
