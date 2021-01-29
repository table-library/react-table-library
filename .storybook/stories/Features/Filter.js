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

storiesOf('02. Features/ 08. Filter WIP', module)
  .addParameters({ component: Table })
  .add('default', () => {
    return <>WIP</>;
  });
