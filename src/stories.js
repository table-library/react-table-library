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

storiesOf('00. Installation', module)
  .addParameters({ component: Table })
  .add('Introduction', () => {
    return <p>Introduction ....</p>;
  })
  .add('Install', () => {
    return <p>Foo Bar</p>;
  })
  .add('License', () => {
    return <p>Foo Bar</p>;
  });
