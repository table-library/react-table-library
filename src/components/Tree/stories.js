/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { storiesOf } from '@storybook/react';

import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  HeaderCell,
  Cell
} from '@table';

import { RowTree, CellTree } from '@tree';

const list = [
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

storiesOf('01. Features/05. Tree', module)
  .addParameters({ component: Table })
  .add('default', () => {
    return (
      <Table layout={['25%', '25%', '25%', '25%']} resize list={list}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell width="25%">Name</HeaderCell>
                <HeaderCell width="25%">Stars</HeaderCell>
                <HeaderCell width="25%">Light</HeaderCell>
                <HeaderCell width="25%">Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <RowTree key={item.id} item={item}>
                  {tableItem => (
                    <>
                      <Cell width="25%">{tableItem.name}</Cell>
                      <Cell width="25%">{tableItem.stars}</Cell>
                      <Cell width="25%">
                        {tableItem.light.toString()}
                      </Cell>
                      <Cell width="25%">{tableItem.count}</Cell>
                    </>
                  )}
                </RowTree>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('icon', () => {
    return (
      <Table layout={['25%', '25%', '25%', '25%']} resize list={list}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell width="25%">Name</HeaderCell>
                <HeaderCell width="25%">Stars</HeaderCell>
                <HeaderCell width="25%">Light</HeaderCell>
                <HeaderCell width="25%">Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <RowTree key={item.id} item={item}>
                  {tableItem => (
                    <>
                      <CellTree item={tableItem} width="25%">
                        {tableItem.name}
                      </CellTree>
                      <Cell width="25%">{tableItem.stars}</Cell>
                      <Cell width="25%">
                        {tableItem.light.toString()}
                      </Cell>
                      <Cell width="25%">{tableItem.count}</Cell>
                    </>
                  )}
                </RowTree>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('expand on icon', () => {
    return (
      <Table layout={['25%', '25%', '25%', '25%']} resize list={list}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell width="25%">Name</HeaderCell>
                <HeaderCell width="25%">Stars</HeaderCell>
                <HeaderCell width="25%">Light</HeaderCell>
                <HeaderCell width="25%">Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <RowTree
                  key={item.id}
                  item={item}
                  treeType={RowTree.TREE_TYPES.ButtonTreeClick}
                >
                  {tableItem => (
                    <>
                      <CellTree item={tableItem} width="25%">
                        {tableItem.name}
                      </CellTree>
                      <Cell width="25%">{tableItem.stars}</Cell>
                      <Cell width="25%">
                        {tableItem.light.toString()}
                      </Cell>
                      <Cell width="25%">{tableItem.count}</Cell>
                    </>
                  )}
                </RowTree>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('default tree', () => {
    const defaultTree = {
      ids: ['2', '62', '4']
    };

    return (
      <Table
        layout={['25%', '25%', '25%', '25%']}
        resize
        list={list}
        defaultTree={defaultTree}
      >
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell width="25%">Name</HeaderCell>
                <HeaderCell width="25%">Stars</HeaderCell>
                <HeaderCell width="25%">Light</HeaderCell>
                <HeaderCell width="25%">Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <RowTree key={item.id} item={item}>
                  {tableItem => (
                    <>
                      <CellTree item={tableItem} width="25%">
                        {tableItem.name}
                      </CellTree>
                      <Cell width="25%">{tableItem.stars}</Cell>
                      <Cell width="25%">
                        {tableItem.light.toString()}
                      </Cell>
                      <Cell width="25%">{tableItem.count}</Cell>
                    </>
                  )}
                </RowTree>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('zoom on double click', () => {
    return (
      <Table layout={['25%', '25%', '25%', '25%']} resize list={list}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell width="25%">Name</HeaderCell>
                <HeaderCell width="25%">Stars</HeaderCell>
                <HeaderCell width="25%">Light</HeaderCell>
                <HeaderCell width="25%">Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <RowTree
                  key={item.id}
                  item={item}
                  onDoubleClick={(_, tableItem) =>
                    console.log(tableItem)
                  }
                >
                  {tableItem => (
                    <>
                      <CellTree item={tableItem} width="25%">
                        {tableItem.name}
                      </CellTree>
                      <Cell width="25%">{tableItem.stars}</Cell>
                      <Cell width="25%">
                        {tableItem.light.toString()}
                      </Cell>
                      <Cell width="25%">{tableItem.count}</Cell>
                    </>
                  )}
                </RowTree>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('tree icon size', () => {
    return (
      <Table layout={['25%', '25%', '25%', '25%']} resize list={list}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell width="25%">Name</HeaderCell>
                <HeaderCell width="25%">Stars</HeaderCell>
                <HeaderCell width="25%">Light</HeaderCell>
                <HeaderCell width="25%">Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <RowTree key={item.id} item={item}>
                  {tableItem => (
                    <>
                      <CellTree
                        item={tableItem}
                        width="25%"
                        treeIcon={{
                          size: '10px'
                        }}
                      >
                        {tableItem.name}
                      </CellTree>
                      <Cell width="25%">{tableItem.stars}</Cell>
                      <Cell width="25%">
                        {tableItem.light.toString()}
                      </Cell>
                      <Cell width="25%">{tableItem.count}</Cell>
                    </>
                  )}
                </RowTree>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('custom tree icon (Material UI)', () => {
    return (
      <Table layout={['25%', '25%', '25%', '25%']} resize list={list}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell width="25%">Name</HeaderCell>
                <HeaderCell width="25%">Stars</HeaderCell>
                <HeaderCell width="25%">Light</HeaderCell>
                <HeaderCell width="25%">Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <RowTree key={item.id} item={item}>
                  {tableItem => (
                    <>
                      <CellTree
                        item={tableItem}
                        width="25%"
                        treeIcon={{
                          margin: '4px',
                          iconDefault: (
                            <InsertDriveFileOutlinedIcon fontSize="small" />
                          ),
                          iconRight: <FolderIcon fontSize="small" />,
                          iconDown: (
                            <FolderOpenIcon fontSize="small" />
                          )
                        }}
                      >
                        {tableItem.name}
                      </CellTree>
                      <Cell width="25%">{tableItem.stars}</Cell>
                      <Cell width="25%">
                        {tableItem.light.toString()}
                      </Cell>
                      <Cell width="25%">{tableItem.count}</Cell>
                    </>
                  )}
                </RowTree>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });
