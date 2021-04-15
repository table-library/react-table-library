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

import {
  CellTree,
  useTree,
  TREE_EXPAND_CLICK_TYPES,
} from '@table-library/react-table-library/tree';
import {
  CellSelect,
  HeaderCellSelect,
  useSelect,
  SELECT_CLICK_TYPES,
} from '@table-library/react-table-library/select';

import { nodes } from '../data';

storiesOf('Composites/Tree & Select', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const data = { nodes };

    const tree = useTree(data, {
      onChange: onTreeChange,
    });

    const select = useSelect(data, {
      onChange: onSelectChange,
    });

    function onTreeChange(action, state) {
      console.log(action, state);
    }

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} tree={tree} select={select}>
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
                <Row key={item.id} item={item}>
                  {(tableItem) => (
                    <>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'fr-CA',
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
  .add('select on checkbox, expand tree on tree icon click', () => {
    const data = { nodes };

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

    const select = useSelect(
      data,
      {
        onChange: onSelectChange,
      },
      {
        clickType: SELECT_CLICK_TYPES.ButtonClick,
      }
    );

    function onTreeChange(action, state) {
      console.log(action, state);
    }

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} tree={tree} select={select}>
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
                  {(tableItem) => (
                    <>
                      <CellSelect item={tableItem} />
                      <CellTree item={tableItem}>
                        {tableItem.name}
                      </CellTree>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'fr-CA',
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
  .add('select on row click, expand tree on tree icon click', () => {
    const data = { nodes };

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

    const select = useSelect(
      data,
      {
        onChange: onSelectChange,
      },
      {
        clickType: SELECT_CLICK_TYPES.RowClick,
      }
    );

    function onTreeChange(action, state) {
      console.log(action, state);
    }

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} tree={tree} select={select}>
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
                  {(tableItem) => (
                    <>
                      <CellSelect item={tableItem} />
                      <CellTree item={tableItem}>
                        {tableItem.name}
                      </CellTree>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'fr-CA',
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
  .add('expand tree on row click, select on checkbox', () => {
    const data = { nodes };

    const tree = useTree(
      data,
      {
        onChange: onTreeChange,
      },
      {
        clickType: TREE_EXPAND_CLICK_TYPES.RowClick,
        treeYLevel: 1,
      }
    );

    const select = useSelect(
      data,
      {
        onChange: onSelectChange,
      },
      {
        clickType: SELECT_CLICK_TYPES.ButtonClick,
      }
    );

    function onTreeChange(action, state) {
      console.log(action, state);
    }

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} tree={tree} select={select}>
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
                  {(tableItem) => (
                    <>
                      <CellSelect item={tableItem} />
                      <CellTree item={tableItem}>
                        {tableItem.name}
                      </CellTree>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'fr-CA',
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
  .add(
    'only tree icon: expand tree on tree icon click, select on row click',
    () => {
      const data = { nodes };

      const tree = useTree(
        data,
        {
          onChange: onTreeChange,
        },
        {
          clickType: TREE_EXPAND_CLICK_TYPES.ButtonClick,
        }
      );

      const select = useSelect(data, {
        onChange: onSelectChange,
      });

      function onTreeChange(action, state) {
        console.log(action, state);
      }

      function onSelectChange(action, state) {
        console.log(action, state);
      }

      return (
        <Table data={data} tree={tree} select={select}>
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
                  <Row key={item.id} item={item}>
                    {(tableItem) => (
                      <>
                        <CellTree item={tableItem}>
                          {tableItem.name}
                        </CellTree>
                        <Cell>
                          {tableItem.deadline.toLocaleDateString(
                            'fr-CA',
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
    }
  )
  .add(
    'only checkbox: select on checkbox, expand tree on row click',
    () => {
      const data = { nodes };

      const tree = useTree(
        data,
        {
          onChange: onTreeChange,
        },
        {
          treeYLevel: 1,
        }
      );

      const select = useSelect(
        data,
        {
          onChange: onSelectChange,
        },
        {
          clickType: SELECT_CLICK_TYPES.ButtonClick,
        }
      );

      function onTreeChange(action, state) {
        console.log(action, state);
      }

      function onSelectChange(action, state) {
        console.log(action, state);
      }

      return (
        <Table data={data} tree={tree} select={select}>
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
                    {(tableItem) => (
                      <>
                        <CellSelect item={tableItem} />
                        <Cell>{tableItem.name}</Cell>
                        <Cell>
                          {tableItem.deadline.toLocaleDateString(
                            'fr-CA',
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
    }
  );
