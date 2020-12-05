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

import { useExpandRow } from '@expand';

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

storiesOf('01. Features/ 10. Expand WIP', module)
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
  .add('expand icon WIP', () => <div>WIP</div>)
  .add('expand row on expand icon click WIP', () => <div>WIP</div>)
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
      <Table list={list} defaultExpand={defaultExpand}>
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
  });
