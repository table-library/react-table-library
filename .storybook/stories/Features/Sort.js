/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
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
  Cell
} from '@table-library/react-table-library/lib/table';

import {
  useSort,
  HeaderCellSort,
  SORT_ICON_POSITIONS
} from '@table-library/react-table-library/lib/sort';

const nodes = [
  { id: '1', name: 'Hello', stars: 24, count: 42, light: true },
  { id: '2', name: 'There', stars: 42, count: 24, light: false },
  { id: '3', name: 'Nice', stars: 111, count: 111, light: true },
  { id: '4', name: 'To', stars: 122, count: 133, light: false },
  { id: '5', name: 'Meet', stars: 133, count: 122, light: true },
  { id: '6', name: 'You', stars: 155, count: 155, light: true },
  {
    id: '7',
    name: 'And Welcome To This Table Folks',
    stars: 155,
    count: 155,
    light: true
  }
];

storiesOf('01. Features/ 05. Sort', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const data = { nodes };

    const sort = useSort({
      onChange: onSortChange
    });

    function onSortChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} sort={sort}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  sortKey="NAME"
                  sortFn={array =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="STARS"
                  sortFn={array =>
                    array.sort((a, b) => a.stars - b.stars)
                  }
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="LIGHT"
                  sortFn={array =>
                    array.sort((a, b) => a.light - b.light)
                  }
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="COUNT"
                  sortFn={array =>
                    array.sort((a, b) => a.count - b.count)
                  }
                >
                  Count
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row item={item} key={item.id}>
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>{tableItem.stars}</Cell>
                      <Cell>{tableItem.light.toString()}</Cell>
                      <Cell>{tableItem.count}</Cell>
                    </React.Fragment>
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

    const sort = useSort({
      initialState: {
        sortKey: 'NAME',
        sortFn: array =>
          array.sort((a, b) => a.name.localeCompare(b.name)),
        reverse: false
      },
      onChange: onSortChange
    });

    function onSortChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} sort={sort}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  sortKey="NAME"
                  sortFn={array =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="STARS"
                  sortFn={array =>
                    array.sort((a, b) => a.stars - b.stars)
                  }
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="LIGHT"
                  sortFn={array =>
                    array.sort((a, b) => a.light - b.light)
                  }
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="COUNT"
                  sortFn={array =>
                    array.sort((a, b) => a.count - b.count)
                  }
                >
                  Count
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row item={item} key={item.id}>
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>{tableItem.stars}</Cell>
                      <Cell>{tableItem.light.toString()}</Cell>
                      <Cell>{tableItem.count}</Cell>
                    </React.Fragment>
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

    const sort = useSort({
      onChange: onSortChange
    });

    function onSortChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} sort={sort}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  sortKey="NAME"
                  sortFn={array =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                  sortIcon={{
                    size: '10px'
                  }}
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="STARS"
                  sortFn={array =>
                    array.sort((a, b) => a.stars - b.stars)
                  }
                  sortIcon={{
                    size: '10px'
                  }}
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="LIGHT"
                  sortFn={array =>
                    array.sort((a, b) => a.light - b.light)
                  }
                  sortIcon={{
                    size: '10px'
                  }}
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="COUNT"
                  sortFn={array =>
                    array.sort((a, b) => a.count - b.count)
                  }
                  sortIcon={{
                    size: '10px'
                  }}
                >
                  Count
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row item={item} key={item.id}>
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>{tableItem.stars}</Cell>
                      <Cell>{tableItem.light.toString()}</Cell>
                      <Cell>{tableItem.count}</Cell>
                    </React.Fragment>
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

    const sort = useSort({
      onChange: onSortChange
    });

    function onSortChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} sort={sort}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  sortKey="NAME"
                  sortFn={array =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                  sortIcon={{
                    position: SORT_ICON_POSITIONS.Prefix
                  }}
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="STARS"
                  sortFn={array =>
                    array.sort((a, b) => a.stars - b.stars)
                  }
                  sortIcon={{
                    position: SORT_ICON_POSITIONS.Prefix
                  }}
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="LIGHT"
                  sortFn={array =>
                    array.sort((a, b) => a.light - b.light)
                  }
                  sortIcon={{
                    position: SORT_ICON_POSITIONS.Prefix
                  }}
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="COUNT"
                  sortFn={array =>
                    array.sort((a, b) => a.count - b.count)
                  }
                  sortIcon={{
                    position: SORT_ICON_POSITIONS.Prefix
                  }}
                >
                  Count
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row item={item} key={item.id}>
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>{tableItem.stars}</Cell>
                      <Cell>{tableItem.light.toString()}</Cell>
                      <Cell>{tableItem.count}</Cell>
                    </React.Fragment>
                  )}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('indentation ', () => {
    const data = { nodes };

    const sort = useSort({
      onChange: onSortChange
    });

    function onSortChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} sort={sort}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  sortKey="NAME"
                  sortFn={array =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                  sortIcon={{
                    position: SORT_ICON_POSITIONS.Prefix
                  }}
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="STARS"
                  sortFn={array =>
                    array.sort((a, b) => a.stars - b.stars)
                  }
                  sortIcon={{
                    position: SORT_ICON_POSITIONS.Prefix
                  }}
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="LIGHT"
                  sortFn={array =>
                    array.sort((a, b) => a.light - b.light)
                  }
                  sortIcon={{
                    position: SORT_ICON_POSITIONS.Prefix
                  }}
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="COUNT"
                  sortFn={array =>
                    array.sort((a, b) => a.count - b.count)
                  }
                  sortIcon={{
                    position: SORT_ICON_POSITIONS.Prefix
                  }}
                >
                  Count
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row item={item} key={item.id}>
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <Cell indentation={18}>{tableItem.name}</Cell>
                      <Cell indentation={18}>{tableItem.stars}</Cell>
                      <Cell indentation={18}>
                        {tableItem.light.toString()}
                      </Cell>
                      <Cell indentation={18}>{tableItem.count}</Cell>
                    </React.Fragment>
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

    const sort = useSort({
      onChange: onSortChange
    });

    function onSortChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} sort={sort}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  sortKey="NAME"
                  sortFn={array =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                  sortIcon={{
                    iconDefault: null,
                    iconUp: null,
                    iconDown: null
                  }}
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="STARS"
                  sortFn={array =>
                    array.sort((a, b) => a.stars - b.stars)
                  }
                  sortIcon={{
                    iconDefault: null,
                    iconUp: null,
                    iconDown: null
                  }}
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="LIGHT"
                  sortFn={array =>
                    array.sort((a, b) => a.light - b.light)
                  }
                  sortIcon={{
                    iconDefault: null,
                    iconUp: null,
                    iconDown: null
                  }}
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="COUNT"
                  sortFn={array =>
                    array.sort((a, b) => a.count - b.count)
                  }
                  sortIcon={{
                    iconDefault: null,
                    iconUp: null,
                    iconDown: null
                  }}
                >
                  Count
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row item={item} key={item.id}>
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>{tableItem.stars}</Cell>
                      <Cell>{tableItem.light.toString()}</Cell>
                      <Cell>{tableItem.count}</Cell>
                    </React.Fragment>
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

    const sort = useSort({
      onChange: onSortChange
    });

    function onSortChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} sort={sort}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  sortKey="NAME"
                  sortFn={array =>
                    array.sort((a, b) => a.name.localeCompare(b.name))
                  }
                  sortIcon={{
                    margin: '0px',
                    iconDefault: (
                      <UnfoldMoreOutlinedIcon fontSize="small" />
                    ),
                    iconUp: (
                      <KeyboardArrowUpOutlinedIcon fontSize="small" />
                    ),
                    iconDown: (
                      <KeyboardArrowDownOutlinedIcon fontSize="small" />
                    )
                  }}
                >
                  Name
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="STARS"
                  sortFn={array =>
                    array.sort((a, b) => a.stars - b.stars)
                  }
                  sortIcon={{
                    margin: '0px',
                    iconDefault: (
                      <UnfoldMoreOutlinedIcon fontSize="small" />
                    ),
                    iconUp: (
                      <KeyboardArrowUpOutlinedIcon fontSize="small" />
                    ),
                    iconDown: (
                      <KeyboardArrowDownOutlinedIcon fontSize="small" />
                    )
                  }}
                >
                  Stars
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="LIGHT"
                  sortFn={array =>
                    array.sort((a, b) => a.light - b.light)
                  }
                  sortIcon={{
                    margin: '0px',
                    iconDefault: (
                      <UnfoldMoreOutlinedIcon fontSize="small" />
                    ),
                    iconUp: (
                      <KeyboardArrowUpOutlinedIcon fontSize="small" />
                    ),
                    iconDown: (
                      <KeyboardArrowDownOutlinedIcon fontSize="small" />
                    )
                  }}
                >
                  Light
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="COUNT"
                  sortFn={array =>
                    array.sort((a, b) => a.count - b.count)
                  }
                  sortIcon={{
                    margin: '0px',
                    iconDefault: (
                      <UnfoldMoreOutlinedIcon fontSize="small" />
                    ),
                    iconUp: (
                      <KeyboardArrowUpOutlinedIcon fontSize="small" />
                    ),
                    iconDown: (
                      <KeyboardArrowDownOutlinedIcon fontSize="small" />
                    )
                  }}
                >
                  Count
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row item={item} key={item.id}>
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>{tableItem.stars}</Cell>
                      <Cell>{tableItem.light.toString()}</Cell>
                      <Cell>{tableItem.count}</Cell>
                    </React.Fragment>
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

    const sort = useSort({
      onChange: onSortChange
    });

    function onSortChange(action, state) {
      console.log(action, state);
    }

    const getIcon = sortKey => {
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
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort custom>
                  <Button
                    fullWidth
                    style={{ justifyContent: 'flex-start' }}
                    endIcon={getIcon('COUNT')}
                    onClick={() =>
                      sort.fns.onToggleSort({
                        sortKey: 'COUNT',
                        sortFn: array =>
                          array.sort((a, b) =>
                            a.name.localeCompare(b.name)
                          )
                      })
                    }
                  >
                    Name
                  </Button>
                </HeaderCellSort>
                <HeaderCellSort custom>
                  <Button
                    fullWidth
                    style={{ justifyContent: 'flex-start' }}
                    endIcon={getIcon('STARS')}
                    onClick={() =>
                      sort.fns.onToggleSort({
                        sortKey: 'STARS',
                        sortFn: array =>
                          array.sort((a, b) => a.stars - b.stars)
                      })
                    }
                  >
                    Stars
                  </Button>
                </HeaderCellSort>
                <HeaderCellSort custom>
                  <Button
                    fullWidth
                    style={{ justifyContent: 'flex-start' }}
                    endIcon={getIcon('LIGHT')}
                    onClick={() =>
                      sort.fns.onToggleSort({
                        sortKey: 'LIGHT',
                        sortFn: array =>
                          array.sort((a, b) => a.light - b.light)
                      })
                    }
                  >
                    Light
                  </Button>
                </HeaderCellSort>
                <HeaderCellSort custom>
                  <Button
                    fullWidth
                    style={{ justifyContent: 'flex-start' }}
                    endIcon={getIcon('COUNT')}
                    onClick={() =>
                      sort.fns.onToggleSort({
                        sortKey: 'COUNT',
                        sortFn: array =>
                          array.sort((a, b) => a.count - b.count)
                      })
                    }
                  >
                    Count
                  </Button>
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row item={item} key={item.id}>
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>{tableItem.stars}</Cell>
                      <Cell>{tableItem.light.toString()}</Cell>
                      <Cell>{tableItem.count}</Cell>
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
