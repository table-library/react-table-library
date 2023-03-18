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

import { nodes } from '../../data';

const Component = () => {
  const data = { nodes };

  const theme = useTheme({
    Table: `
        --data-table-library_grid-template-columns:  24px repeat(5, minmax(0, 1fr));
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
};

export default Component;
