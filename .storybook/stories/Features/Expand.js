/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { storiesOf } from '@storybook/react';

import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import IconButton from '@material-ui/core/IconButton';

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
  HeaderCellExpand,
  CellExpand,
  useExpandRow,
  EXPAND_TYPES
} from '@table-library/react-table-library/lib/expand';

const list = [
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

storiesOf('01. Features/ 10. Expand', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const ExpansionPanel = ({ item }) => (
      <div>
        <div>
          <strong>Name:</strong> {item.name}
        </div>
        <div>
          <strong>Stars:</strong> {item.stars}
        </div>
        <div>
          <strong>Light:</strong> {item.light.toString()}
        </div>
        <div>
          <strong>Count:</strong> {item.count}
        </div>
      </div>
    );

    return (
      <Table data={{ nodes: list }}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Stars</HeaderCell>
                <HeaderCell>Light</HeaderCell>
                <HeaderCell>Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row
                  key={item.id}
                  item={item}
                  plugins={[
                    {
                      plugin: useExpandRow,
                      options: {
                        expansionPanel: tableItem => (
                          <ExpansionPanel item={tableItem} />
                        )
                      }
                    }
                  ]}
                >
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
  .add('default expand', () => {
    const defaultExpand = {
      ids: ['2', '4']
    };

    const ExpansionPanel = ({ item }) => (
      <div>
        <div>
          <strong>Name:</strong> {item.name}
        </div>
        <div>
          <strong>Stars:</strong> {item.stars}
        </div>
        <div>
          <strong>Light:</strong> {item.light.toString()}
        </div>
        <div>
          <strong>Count:</strong> {item.count}
        </div>
      </div>
    );

    return (
      <Table data={{ nodes: list }} defaultExpand={defaultExpand}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Stars</HeaderCell>
                <HeaderCell>Light</HeaderCell>
                <HeaderCell>Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row
                  key={item.id}
                  item={item}
                  plugins={[
                    {
                      plugin: useExpandRow,
                      options: {
                        expansionPanel: tableItem => (
                          <ExpansionPanel item={tableItem} />
                        )
                      }
                    }
                  ]}
                >
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
  .add('expand icon', () => {
    const ExpansionPanel = ({ item }) => (
      <div>
        <div>
          <strong>Name:</strong> {item.name}
        </div>
        <div>
          <strong>Stars:</strong> {item.stars}
        </div>
        <div>
          <strong>Light:</strong> {item.light.toString()}
        </div>
        <div>
          <strong>Count:</strong> {item.count}
        </div>
      </div>
    );

    return (
      <Table data={{ nodes: list }}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellExpand />
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Stars</HeaderCell>
                <HeaderCell>Light</HeaderCell>
                <HeaderCell>Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row
                  key={item.id}
                  item={item}
                  plugins={[
                    {
                      plugin: useExpandRow,
                      options: {
                        expansionPanel: tableItem => (
                          <ExpansionPanel item={tableItem} />
                        )
                      }
                    }
                  ]}
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellExpand item={tableItem} />
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
  .add('expand row on expand icon click', () => {
    const ExpansionPanel = ({ item }) => (
      <div>
        <div>
          <strong>Name:</strong> {item.name}
        </div>
        <div>
          <strong>Stars:</strong> {item.stars}
        </div>
        <div>
          <strong>Light:</strong> {item.light.toString()}
        </div>
        <div>
          <strong>Count:</strong> {item.count}
        </div>
      </div>
    );

    return (
      <Table data={{ nodes: list }}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellExpand />
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Stars</HeaderCell>
                <HeaderCell>Light</HeaderCell>
                <HeaderCell>Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row
                  key={item.id}
                  item={item}
                  plugins={[
                    {
                      plugin: useExpandRow,
                      options: {
                        expandType: EXPAND_TYPES.ButtonClick,
                        expansionPanel: tableItem => (
                          <ExpansionPanel item={tableItem} />
                        )
                      }
                    }
                  ]}
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellExpand item={tableItem} />
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
  .add('expand icon size', () => {
    const ExpansionPanel = ({ item }) => (
      <div>
        <div>
          <strong>Name:</strong> {item.name}
        </div>
        <div>
          <strong>Stars:</strong> {item.stars}
        </div>
        <div>
          <strong>Light:</strong> {item.light.toString()}
        </div>
        <div>
          <strong>Count:</strong> {item.count}
        </div>
      </div>
    );

    return (
      <Table data={{ nodes: list }}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellExpand
                  expandIcon={{
                    size: '10px'
                  }}
                />
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Stars</HeaderCell>
                <HeaderCell>Light</HeaderCell>
                <HeaderCell>Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row
                  key={item.id}
                  item={item}
                  plugins={[
                    {
                      plugin: useExpandRow,
                      options: {
                        expansionPanel: tableItem => (
                          <ExpansionPanel item={tableItem} />
                        )
                      }
                    }
                  ]}
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellExpand
                        item={tableItem}
                        expandIcon={{
                          size: '10px'
                        }}
                      />
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
  .add('custom expand icon (Material UI)', () => {
    const ExpansionPanel = ({ item }) => (
      <div>
        <div>
          <strong>Name:</strong> {item.name}
        </div>
        <div>
          <strong>Stars:</strong> {item.stars}
        </div>
        <div>
          <strong>Light:</strong> {item.light.toString()}
        </div>
        <div>
          <strong>Count:</strong> {item.count}
        </div>
      </div>
    );

    return (
      <Table data={{ nodes: list }}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellExpand
                  expandIcon={{
                    iconUp: (
                      <KeyboardArrowUpOutlinedIcon fontSize="small" />
                    ),
                    iconDown: (
                      <KeyboardArrowDownOutlinedIcon fontSize="small" />
                    )
                  }}
                />
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Stars</HeaderCell>
                <HeaderCell>Light</HeaderCell>
                <HeaderCell>Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row
                  key={item.id}
                  item={item}
                  plugins={[
                    {
                      plugin: useExpandRow,
                      options: {
                        expansionPanel: tableItem => (
                          <ExpansionPanel item={tableItem} />
                        )
                      }
                    }
                  ]}
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellExpand
                        item={tableItem}
                        expandIcon={{
                          iconUp: (
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                          ),
                          iconDown: (
                            <KeyboardArrowDownOutlinedIcon fontSize="small" />
                          )
                        }}
                      />
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
  .add('custom expand button (Material UI)', () => {
    const ExpansionPanel = ({ item }) => (
      <div>
        <div>
          <strong>Name:</strong> {item.name}
        </div>
        <div>
          <strong>Stars:</strong> {item.stars}
        </div>
        <div>
          <strong>Light:</strong> {item.light.toString()}
        </div>
        <div>
          <strong>Count:</strong> {item.count}
        </div>
      </div>
    );

    return (
      <Table data={{ nodes: list }}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellExpand>
                  {expand => (
                    <IconButton
                      size="small"
                      onClick={expand.onToggleExpandAll}
                    >
                      {expand.expandState.allExpanded ? (
                        <KeyboardArrowUpOutlinedIcon fontSize="small" />
                      ) : (
                        <KeyboardArrowDownOutlinedIcon fontSize="small" />
                      )}
                    </IconButton>
                  )}
                </HeaderCellExpand>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Stars</HeaderCell>
                <HeaderCell>Light</HeaderCell>
                <HeaderCell>Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row
                  key={item.id}
                  item={item}
                  plugins={[
                    {
                      plugin: useExpandRow,
                      options: {
                        expansionPanel: tableItem => (
                          <ExpansionPanel item={tableItem} />
                        )
                      }
                    }
                  ]}
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellExpand item={tableItem}>
                        {expand => (
                          <IconButton
                            size="small"
                            onClick={() =>
                              expand.onToggleExpandById(tableItem.id)
                            }
                          >
                            {expand.expandState.ids.includes(
                              tableItem.id
                            ) ? (
                              <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            ) : (
                              <KeyboardArrowDownOutlinedIcon fontSize="small" />
                            )}
                          </IconButton>
                        )}
                      </CellExpand>
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
