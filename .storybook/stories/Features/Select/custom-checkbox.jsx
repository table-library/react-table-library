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
} from '@overmap-ai/react-table-library/table';
import { useTheme } from '@overmap-ai/react-table-library/theme';

import {
  HeaderCellSelect,
  CellSelect,
  SelectClickTypes,
  SelectTypes,
  useRowSelect,
} from '@overmap-ai/react-table-library/select';

import { nodes } from '../../data';

const Component = () => {
  const data = { nodes };

  const theme = useTheme({
    Table: `
        --data-table-library_grid-template-columns:  38px repeat(5, minmax(0, 1fr));
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
};

export default Component;
