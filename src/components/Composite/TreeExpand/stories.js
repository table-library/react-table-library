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
} from '@table';

import { CellTree, useTreeRow, TREE_EXPAND_TYPES } from '@tree';

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

storiesOf('02. Composites/ 04. Tree & Expand', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const Content = ({ item }) => (
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

    const [expandedRows, setExpandedRows] = React.useState([]);

    const handleExpandRow = id => {
      if (expandedRows.includes(id)) {
        setExpandedRows(expandedRows.filter(value => value !== id));
      } else {
        setExpandedRows(expandedRows.concat(id));
      }
    };

    console.log(expandedRows);

    return (
      <Table list={list}>
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
                      plugin: useTreeRow,
                      options: {
                        treeExpandType: TREE_EXPAND_TYPES.ButtonClick
                      }
                    }
                  ]}
                  onClick={tableItem => handleExpandRow(tableItem.id)}
                  expansion={tableItem =>
                    expandedRows.includes(tableItem.id) && (
                      <Content item={tableItem} />
                    )
                  }
                >
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
  });
