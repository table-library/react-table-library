/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Checkbox from '@material-ui/core/Checkbox';

import {
  Table,
  Content,
  Header,
  HeaderRow,
  Body,
  HeaderCell,
  Cell
} from '@table';

import { RowSelect, HeaderCellSelect, CellSelect } from '@select';

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

storiesOf('04. Table with Select', module)
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
                <RowSelect item={item} key={item.id}>
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
                </RowSelect>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  })
  .add('default select', () => {
    const defaultSelect = {
      ids: ['2', '4']
    };

    return (
      <Table list={list} defaultSelect={defaultSelect}>
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
                <RowSelect item={item} key={item.id}>
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
                </RowSelect>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  })
  .add('checkbox', () => {
    return (
      <Table list={list}>
        {tableList => (
          <Content>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
                <HeaderCell width="20%">Name</HeaderCell>
                <HeaderCell width="20%">Stars</HeaderCell>
                <HeaderCell width="20%">Light</HeaderCell>
                <HeaderCell width="20%">Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <RowSelect
                  key={item.id}
                  item={item}
                  selectType={
                    RowSelect.SELECT_TYPES.ButtonSelectClick
                  }
                >
                  {tableItem => (
                    <>
                      <CellSelect item={tableItem} />
                      <Cell width="20%">{tableItem.name}</Cell>
                      <Cell width="20%">{tableItem.stars}</Cell>
                      <Cell width="20%">
                        {tableItem.light.toString()}
                      </Cell>
                      <Cell width="20%">{tableItem.count}</Cell>
                    </>
                  )}
                </RowSelect>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  })
  .add('custom checkbox (Material UI)', () => {
    return (
      <Table list={list}>
        {tableList => (
          <Content>
            <Header>
              <HeaderRow>
                <HeaderCellSelect>
                  {({ selectState, onSelectAll }) => (
                    <Checkbox
                      size="small"
                      checked={selectState.allSelected}
                      indeterminate={
                        !selectState.allSelected &&
                        !selectState.noneSelected
                      }
                      onChange={onSelectAll}
                    />
                  )}
                </HeaderCellSelect>
                <HeaderCell width="20%">Name</HeaderCell>
                <HeaderCell width="20%">Stars</HeaderCell>
                <HeaderCell width="20%">Light</HeaderCell>
                <HeaderCell width="20%">Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <RowSelect
                  key={item.id}
                  item={item}
                  selectType={
                    RowSelect.SELECT_TYPES.ButtonSelectClick
                  }
                >
                  {tableItem => (
                    <>
                      <CellSelect item={tableItem}>
                        <Checkbox size="small" />
                      </CellSelect>
                      <Cell width="20%">{tableItem.name}</Cell>
                      <Cell width="20%">{tableItem.stars}</Cell>
                      <Cell width="20%">
                        {tableItem.light.toString()}
                      </Cell>
                      <Cell width="20%">{tableItem.count}</Cell>
                    </>
                  )}
                </RowSelect>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  });
