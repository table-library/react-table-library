/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Table,
  Content,
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

storiesOf('02. Table with Themes', module)
  .addParameters({ component: Table })
  .add('default', () => {
    return (
      <Table list={list}>
        {tableList => (
          <Content>
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
                <Row key={item.id}>
                  <Cell width="25%">{item.name}</Cell>
                  <Cell width="25%">{item.stars}</Cell>
                  <Cell width="25%">{item.light.toString()}</Cell>
                  <Cell width="25%">{item.count}</Cell>
                </Row>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  })
  .add('Ocean Blue', () => {
    const theme = useTheme({
      HeaderRow: `
        background-color: #eaf5fd;
      `,
      Row: `
        &:nth-child(odd) {
          background-color: #d2e9fb;
        }

        &:nth-child(even) {
          background-color: #eaf5fd;
        }
      `,
      Cell: `
        & > div {
          border-right: 1px solid #b6cada;
        }
      `
    });

    return (
      <Table list={list} theme={theme}>
        {tableList => (
          <Content>
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
                <Row key={item.id}>
                  <Cell width="25%">{item.name}</Cell>
                  <Cell width="25%">{item.stars}</Cell>
                  <Cell width="25%">{item.light.toString()}</Cell>
                  <Cell width="25%">{item.count}</Cell>
                </Row>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  })
  .add('Grey Wolf', () => {
    const theme = useTheme({
      HeaderRow: `
        background-color: #fafafa;
      `,
      Row: `
        &:nth-child(odd) {
          background-color: #f5f5f5;
        }

        &:nth-child(even) {
          background-color: #fafafa;
        }
      `,
      HeaderCell: `
        & > div {
          border-right: 1px solid transparent;

          font-weight: semi-bold;
        }
      `,
      Cell: `
        & > div {
          border-right: 1px solid transparent;

          font-weight: semi-bold;
        }
      `
    });

    return (
      <Table list={list} theme={theme}>
        {tableList => (
          <Content>
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
                <Row key={item.id}>
                  <Cell width="25%">{item.name}</Cell>
                  <Cell width="25%">{item.stars}</Cell>
                  <Cell width="25%">{item.light.toString()}</Cell>
                  <Cell width="25%">{item.count}</Cell>
                </Row>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  })
  .add('Machine', () => {
    const theme = useTheme({
      HeaderRow: `
        font-size: 18px;
        color: #000000;
      `,
      Row: `
        font-size: 18px;
        color: #363636;

        position: relative;
        margin-top: -1px;
        z-index: 1;

        border-top: 1px solid #a0a8ae;
        border-bottom: 1px solid #a0a8ae;

        &:hover {
          z-index: 2;

          border-top: 1px solid #177ac9;
          border-bottom: 1px solid #177ac9;

          .td > div {
            color: #177ac9;
          }
        }
      `,
      HeaderCell: `
        height: 50px;

        & > div {
          display: flex;
          align-items: center;
          height: 75%;
        }

        &.group > div {
          border-right: 1px solid #a1a1a1;
        }

        &:not(.group) > div {
          border-right: 1px solid transparent;
        }
      `,
      Cell: `
        height: 62px;
        display: flex;
        align-items: center;

        & > div {
          flex: 1;
          display: flex;
          align-items: center;
          height: 75%;
        }

        &.group > div {
          border-right: 1px solid #a1a1a1;
        }

        &:not(.group) > div {
          border-right: 1px solid transparent;
        }
      `
    });

    return (
      <Table list={list} theme={theme}>
        {tableList => (
          <Content>
            <Header>
              <HeaderRow>
                <HeaderCell width="25%">Name</HeaderCell>
                <HeaderCell width="25%" className="group">
                  Stars
                </HeaderCell>
                <HeaderCell width="25%">Light</HeaderCell>
                <HeaderCell width="25%">Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row key={item.id}>
                  <Cell width="25%">{item.name}</Cell>
                  <Cell width="25%" className="group">
                    {item.stars}
                  </Cell>
                  <Cell width="25%">{item.light.toString()}</Cell>
                  <Cell width="25%">{item.count}</Cell>
                </Row>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  });
