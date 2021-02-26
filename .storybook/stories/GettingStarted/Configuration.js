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
  Cell,
} from '@table-library/react-table-library/table';

import { nodes } from '../data';

storiesOf('01. First Steps/ 06. Configuration (WIP)', module)
  .addParameters({ component: Table })
  .add('default', () => {
    return <div>IP</div>;
  });
