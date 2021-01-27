/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { storiesOf } from '@storybook/react';

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
  CellTree,
  useTree,
  TREE_EXPAND_TYPES
} from '@table-library/react-table-library/lib/tree';
import {
  CellSelect,
  HeaderCellSelect,
  useSelect,
  SELECT_TYPES
} from '@table-library/react-table-library/lib/select';

const nodes = [
  {
    id: '1',
    name: 'Empty Folder',
    stars: 24,
    count: 42,
    light: true,
    nodes: []
  },
  {
    id: '2',
    name: 'Images',
    stars: 42,
    count: 24,
    light: false,
    nodes: [
      {
        id: '62',
        name: 'More Images',
        stars: 322,
        count: 333,
        light: true,
        nodes: [
          {
            id: '6442',
            name: 'Image 1.png',
            stars: 2322,
            count: 3333,
            light: true
          },
          {
            id: '6444',
            name: 'Old Images',
            stars: 3522,
            count: 3633,
            light: false,
            nodes: [
              {
                id: '64422',
                name: 'Image 1.jpg',
                stars: 423224,
                count: 233334,
                light: true
              },
              {
                id: '64144',
                name: 'Image 3.jpg',
                stars: 135224,
                count: 136334,
                light: false
              }
            ]
          }
        ]
      },
      {
        id: '64',
        name: 'Some Picture.jpg',
        stars: 522,
        count: 633,
        light: false
      }
    ]
  },
  {
    id: '3',
    name: 'New Folder',
    stars: 111,
    count: 111,
    light: true,
    nodes: []
  },
  {
    id: '4',
    name: 'MyFolder',
    stars: 122,
    count: 133,
    light: false,
    nodes: [
      {
        id: '42',
        name: 'Video 1.mp4',
        stars: 422,
        count: 433,
        light: true
      },
      {
        id: '44',
        name: 'Video 2.mp4',
        stars: 222,
        count: 233,
        light: false
      }
    ]
  },
  {
    id: '5',
    name: 'Some Video.mp4',
    stars: 133,
    count: 122,
    light: true
  },
  {
    id: '6',
    name: 'Empty Folder 2',
    stars: 155,
    count: 155,
    light: true,
    nodes: []
  },
  {
    id: '7',
    name: 'Video3.mp4',
    stars: 155,
    count: 155,
    light: true
  }
];

storiesOf('02. Composites/ 02. Tree & Select', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const data = { nodes };

    const tree = useTree({
      data,
      onChange: onTreeChange
    });

    const select = useSelect({
      data,
      onChange: onSelectChange
    });

    function onTreeChange(action, state) {
      console.log(action, state);
    }

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} tree={tree} select={select}>
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
                <Row key={item.id} item={item}>
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
  .add('select on checkbox, expand tree on tree icon click', () => {
    const data = { nodes };

    const tree = useTree(
      {
        data,
        onChange: onTreeChange
      },
      {
        treeExpandType: TREE_EXPAND_TYPES.ButtonClick,
        treeYLevel: 1
      }
    );

    const select = useSelect(
      {
        data,
        onChange: onSelectChange
      },
      {
        selectType: SELECT_TYPES.ButtonClick
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
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Stars</HeaderCell>
                <HeaderCell>Light</HeaderCell>
                <HeaderCell>Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row key={item.id} item={item}>
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellSelect item={tableItem} />
                      <CellTree item={tableItem}>
                        {tableItem.name}
                      </CellTree>
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
  .add('select on row click, expand tree on tree icon click', () => {
    const data = { nodes };

    const tree = useTree(
      {
        data,
        onChange: onTreeChange
      },
      {
        treeExpandType: TREE_EXPAND_TYPES.ButtonClick,
        treeYLevel: 1
      }
    );

    const select = useSelect(
      {
        data,
        onChange: onSelectChange
      },
      {
        selectType: SELECT_TYPES.RowClick
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
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Stars</HeaderCell>
                <HeaderCell>Light</HeaderCell>
                <HeaderCell>Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row key={item.id} item={item}>
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellSelect item={tableItem} />
                      <CellTree item={tableItem}>
                        {tableItem.name}
                      </CellTree>
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
  .add('expand tree on row click, select on checkbox', () => {
    const data = { nodes };

    const tree = useTree(
      {
        data,
        onChange: onTreeChange
      },
      {
        treeExpandType: TREE_EXPAND_TYPES.RowClick,
        treeYLevel: 1
      }
    );

    const select = useSelect(
      {
        data,
        onChange: onSelectChange
      },
      {
        selectType: SELECT_TYPES.ButtonClick
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
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Stars</HeaderCell>
                <HeaderCell>Light</HeaderCell>
                <HeaderCell>Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row key={item.id} item={item}>
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellSelect item={tableItem} />
                      <CellTree item={tableItem}>
                        {tableItem.name}
                      </CellTree>
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
  .add(
    'only tree icon: expand tree on tree icon click, select on row click',
    () => {
      const data = { nodes };

      const tree = useTree(
        {
          data,
          onChange: onTreeChange
        },
        {
          treeExpandType: TREE_EXPAND_TYPES.ButtonClick
        }
      );

      const select = useSelect({
        data,
        onChange: onSelectChange
      });

      function onTreeChange(action, state) {
        console.log(action, state);
      }

      function onSelectChange(action, state) {
        console.log(action, state);
      }

      return (
        <Table data={data} tree={tree} select={select}>
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
                  <Row key={item.id} item={item}>
                    {tableItem => (
                      <React.Fragment key={tableItem.id}>
                        <CellTree item={tableItem}>
                          {tableItem.name}
                        </CellTree>
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
    }
  )
  .add(
    'only checkbox: select on checkbox, expand tree on row click',
    () => {
      const data = { nodes };

      const tree = useTree(
        {
          data,
          onChange: onTreeChange
        },
        {
          treeYLevel: 1
        }
      );

      const select = useSelect(
        {
          data,
          onChange: onSelectChange
        },
        {
          selectType: SELECT_TYPES.ButtonClick
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
          {tableList => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCellSelect />
                  <HeaderCell>Name</HeaderCell>
                  <HeaderCell>Stars</HeaderCell>
                  <HeaderCell>Light</HeaderCell>
                  <HeaderCell>Count</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map(item => (
                  <Row key={item.id} item={item}>
                    {tableItem => (
                      <React.Fragment key={tableItem.id}>
                        <CellSelect item={tableItem} />
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
    }
  );