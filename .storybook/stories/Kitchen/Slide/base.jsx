import * as React from 'react';
import { createTheme as createMaterialTheme } from '@mui/material/styles';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import Slide from '@mui/material/Slide';

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
import { useRowSelect } from '@overmap-ai/react-table-library/select';

import { nodes } from '../../data';

const Component = () => {
  const data = { nodes };

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onSelectChange(action, state) {
    console.log(action, state);
  }

  const theme = useTheme({
    Table: `
        flex: 1;
        overflow-x: hidden;
      `,
  });

  return (
    <MaterialThemeProvider theme={createMaterialTheme({})}>
      <div style={{ display: 'flex' }}>
        <Table data={data} select={select} theme={theme}>
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
        <Slide direction="left" in={!!select.state.id} mountOnEnter unmountOnExit>
          <div
            style={{
              backgroundColor: '#e0e0e0',
              padding: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              width: '40%',
              textAlign: 'center',
            }}
          >
            {data.nodes.find((node) => node.id === select.state.id)?.name}
          </div>
        </Slide>
      </div>
    </MaterialThemeProvider>
  );
};

export default Component;
