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
  Cell
} from '@table-library/react-table-library/lib/table';

import { nodes } from '../data';

storiesOf('01. First Steps/ 07. Table Configuration (WIP)', module)
  .addParameters({ component: Table })
  .add('default', () => {
    return <div>IP</div>;
  });
