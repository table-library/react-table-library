import * as React from 'react';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { createTheme as createMaterialTheme } from '@mui/material/styles';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

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
  SortIconPositions,
  SortToggleType,
} from '@table-library/react-table-library/sort';

import { nodes } from '../../data';

const Component = () => {
  const data = { nodes };

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
        TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
        TASKS: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    },
  );

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
    <MaterialThemeProvider theme={createMaterialTheme({})}>
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
