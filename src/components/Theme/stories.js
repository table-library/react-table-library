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
import { useTheme } from '@theme';

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

storiesOf('01. Features/ 02. Theme', module)
  .addParameters({ component: Table })
  .add('default', () => {
    return (
      <Table list={list} layout={['25%', '25%', '25%', '25%']} resize>
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
                  <Cell>{item.name}</Cell>
                  <Cell>{item.stars}</Cell>
                  <Cell>{item.light.toString()}</Cell>
                  <Cell>{item.count}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('Ocean Blue', () => {
    const theme = useTheme({
      HeaderRow: `
        font-size: 14px;

        z-index: 3;
        background-color: #eaf5fd;
      `,
      Row: `
        font-size: 14px;

        &:nth-child(odd) {
          background-color: #d2e9fb;
        }

        &:nth-child(even) {
          background-color: #eaf5fd;
        }
      `
    });

    return (
      <Table
        list={list}
        layout={['25%', '25%', '25%', '25%']}
        resize
        theme={theme}
      >
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
                  <Cell>{item.name}</Cell>
                  <Cell>{item.stars}</Cell>
                  <Cell>{item.light.toString()}</Cell>
                  <Cell>{item.count}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('Grey Wolf', () => {
    const theme = useTheme({
      HeaderRow: `
        font-size: 14px;

        z-index: 3;
        background-color: #fafafa;
      `,
      Row: `
        font-size: 14px;

        &:nth-child(odd) {
          background-color: #f5f5f5;
        }

        &:nth-child(even) {
          background-color: #fafafa;
        }
      `
    });

    return (
      <Table
        list={list}
        layout={['25%', '25%', '25%', '25%']}
        resize
        theme={theme}
      >
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
                  <Cell>{item.name}</Cell>
                  <Cell>{item.stars}</Cell>
                  <Cell>{item.light.toString()}</Cell>
                  <Cell>{item.count}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('Machine', () => {
    const theme = useTheme({
      HeaderRow: `
        color: #000000;
      `,
      Row: `
        color: #363636;

        border-top: 1px solid #a0a8ae;
        border-bottom: 1px solid #a0a8ae;

        &:hover {
          border-top: 1px solid #177ac9;
          border-bottom: 1px solid #177ac9;

          color: #177ac9;
        }
      `,
      HeaderCell: `
        margin-top: 9px;
        margin-bottom: 9px;

        padding-top: 11px;
        padding-bottom: 11px;
      `,
      Cell: `
        margin-top: 8px;
        margin-bottom: 9px;
      `
    });

    return (
      <Table
        list={list}
        layout={['25%', '25%', '25%', '25%']}
        resize
        theme={theme}
      >
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell className="group">Stars</HeaderCell>
                <HeaderCell>Light</HeaderCell>
                <HeaderCell>Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
                  <Cell className="group">{item.stars}</Cell>
                  <Cell>{item.light.toString()}</Cell>
                  <Cell>{item.count}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });
